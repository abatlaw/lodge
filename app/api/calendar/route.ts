import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("scheduled_workouts")
    .select("*")
    .order("start_time");

  if (error || !data) {
    return new NextResponse("Failed to load workouts", { status: 500 });
  }

  const lines: string[] = [];

  lines.push("BEGIN:VCALENDAR");
  lines.push("VERSION:2.0");
  lines.push("PRODID:-//Lodge//Workout Planner//EN");
  lines.push("CALSCALE:GREGORIAN");
  lines.push("METHOD:PUBLISH");

  const formatDate = (d: Date) =>
    d
      .toISOString()
      .replace(/[-:]/g, "")
      .split(".")[0] + "Z";

  for (const workout of data) {
    const start = new Date(workout.start_time);
    const end = new Date(workout.end_time);

    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${workout.id}@lodge.arneshbatlaw.com`);
    lines.push(`DTSTAMP:${formatDate(new Date())}`);
    lines.push(`DTSTART:${formatDate(start)}`);
    lines.push(`DTEND:${formatDate(end)}`);
    lines.push(`SUMMARY:${workout.title}`);
    lines.push("STATUS:CONFIRMED");
    lines.push("END:VEVENT");
  }

  lines.push("END:VCALENDAR");

  return new NextResponse(lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": "inline; filename=lodge.ics",
      "Cache-Control": "no-store",
    },
  });
}
