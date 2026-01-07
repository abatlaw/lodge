"use client";

import { useEffect, useState, useRef } from "react";
import WeeklyCalendar from "@/components/WeeklyCalendar";
import WeeklySidebar from "@/components/WeeklySidebar";
import { workoutTemplates } from "@/lib/workoutTemplates";
import { supabase } from "@/lib/supabase";

export default function Page() {
  const [events, setEvents] = useState<any[]>([]);
  const calendarContainerRef = useRef<HTMLDivElement>(null);
  const [calendarHeight, setCalendarHeight] = useState<number>(600);

  useEffect(() => {
    loadWorkouts();
  }, []);

  useEffect(() => {
    if (!calendarContainerRef.current) return;

    const resize = () => {
      setCalendarHeight(calendarContainerRef.current!.clientHeight);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  async function loadWorkouts() {
    const { data } = await supabase
      .from("scheduled_workouts")
      .select("*")
      .order("start_time");

    if (!data) return;

    setEvents(
      data.map((w) => {
        const template = workoutTemplates.find(
          (t) => t.id === w.template_id
        );

        return {
          id: w.id,
          title: w.title,
          start: new Date(w.start_time),
          end: new Date(w.end_time),
          backgroundColor: template?.color,
          borderColor: template?.color,
        };
      })
    );
  }

  // ============================
  // ✅ MISSING HANDLERS (RESTORED)
  // ============================

  async function handleEventReceive(info: any) {
    const templateId = info.event.extendedProps.templateId;
    const template = workoutTemplates.find((t) => t.id === templateId);

    if (!template) {
      info.event.remove();
      return;
    }

    let start: Date;
    let end: Date;

    if (template.type === "flexible") {
      start = info.event.start!;
      end = new Date(start.getTime() + template.durationMinutes! * 60000);
    } else {
      const weekStart = new Date(info.event.start!);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());

      start = new Date(weekStart);
      start.setDate(start.getDate() + template.fixedDayOfWeek!);

      const [sh, sm] = template.fixedStartTime!.split(":").map(Number);
      const [eh, em] = template.fixedEndTime!.split(":").map(Number);

      start.setHours(sh, sm, 0, 0);
      end = new Date(start);
      end.setHours(eh, em, 0, 0);
    }

    const { data, error } = await supabase
      .from("scheduled_workouts")
      .insert({
        template_id: template.id,
        title: template.name,
        start_time: start.toISOString(),
        end_time: end.toISOString(),
      })
      .select()
      .single();

    if (error) {
      info.event.remove();
      alert("Failed to save workout");
      return;
    }

    setEvents((prev) => [
      ...prev,
      {
        id: data.id,
        title: data.title,
        start: new Date(data.start_time),
        end: new Date(data.end_time),
        backgroundColor: template.color,
        borderColor: template.color,
      },
    ]);

    info.event.remove(); // remove temp drag event
  }

  async function handleEventChange(changeInfo: any) {
    const { error } = await supabase
      .from("scheduled_workouts")
      .update({
        start_time: changeInfo.event.start?.toISOString(),
        end_time: changeInfo.event.end?.toISOString(),
      })
      .eq("id", changeInfo.event.id);

    if (error) {
      alert("Could not update workout");
    }

    setEvents((prev) =>
      prev.map((e) =>
        e.id === changeInfo.event.id
          ? { ...e, start: changeInfo.event.start, end: changeInfo.event.end }
          : e
      )
    );
  }

  async function handleEventRemove(clickInfo: any) {
    if (!confirm("Delete this workout?")) return;

    const { error } = await supabase
      .from("scheduled_workouts")
      .delete()
      .eq("id", clickInfo.event.id);

    if (!error) {
      setEvents((prev) =>
        prev.filter((e) => e.id !== clickInfo.event.id)
      );
    }
  }

  // ============================

  return (
    <div style={{ height: "100vh", padding: "16px 24px" }}>
      <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>
        Lodge
      </div>

      <div
        style={{
          display: "flex",
          height: "calc(100% - 48px)",
          overflow: "hidden",
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            width: 260,
            height: "100%",
            overflowY: "auto",
            paddingRight: 8,
          }}
        >
          <WeeklySidebar />
        </div>

        {/* Calendar */}
        <div
          ref={calendarContainerRef}
          style={{
            flex: 1,
            overflow: "hidden",
          }}
        >
          <WeeklyCalendar
            events={events}
            height={calendarHeight}
            onEventAdd={handleEventReceive}
            onEventChange={handleEventChange}
            onEventRemove={handleEventRemove}
          />
        </div>
      </div>
    </div>
  );
}
