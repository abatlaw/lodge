"use client";

import { useEffect, useRef, useState } from "react";
import { Draggable } from "@fullcalendar/interaction";
import { workoutTemplates } from "@/lib/workoutTemplates";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const sidebarTileBaseStyle: React.CSSProperties = {
  borderRadius: 8,
  padding: "10px 12px",
  marginBottom: 8,
  cursor: "grab",
};

export default function WeeklySidebar() {
  const sidebarRef = useRef<HTMLDivElement>(null);

  // ✅ Stable default (matches server render)
  const [isDark, setIsDark] = useState(false);

  // ✅ Resolve dark mode AFTER mount
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(media.matches);

    const listener = (e: MediaQueryListEvent) => setIsDark(e.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (!sidebarRef.current) return;

    new Draggable(sidebarRef.current, {
      itemSelector: ".workout-template",
      eventData: (el) => {
        const templateId = el.getAttribute("data-template-id");
        return {
          extendedProps: {
            templateId,
          },
        };
      },
    });
  }, []);

  return (
    <div
      ref={sidebarRef}
      style={{
        paddingLeft: 0,
        paddingRight: 8,
      }}
    >
      {/* Sidebar title */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,

          fontSize: 14,
          fontWeight: 600,
          marginBottom: 12,
          paddingBottom: 8,

          backgroundColor: "#0b0b0d", // same as sidebar bg
          opacity: 0.9,
          color: isDark ? "#f9fafb" : "#111827",
        }}
      >
        Activities
      </div>

      {workoutTemplates.map((t) => (
        <div
          key={t.id}
          className="workout-template"
          data-template-id={t.id}
          style={{
            ...sidebarTileBaseStyle,

            // 🎨 Light mode shows category tint
            // 🌑 Dark mode stays neutral
            backgroundColor: isDark ? "#141416" : `${t.color}14`,

            color: isDark ? "#f9fafb" : "#111827",

            borderLeft: `6px solid ${t.color}`,
            border: "none",
          }}
        >
          <div style={{ fontWeight: 600, fontSize: 14 }}>
            {t.name}
          </div>

          <div
            style={{
              fontSize: 12,
              opacity: isDark ? 0.85 : 0.7,
            }}
          >
            {t.type === "flexible"
              ? `${t.durationMinutes} min`
              : `${DAYS[t.fixedDayOfWeek!]} · ${t.fixedStartTime}–${t.fixedEndTime}`}
          </div>
        </div>
      ))}
    </div>
  );
}
