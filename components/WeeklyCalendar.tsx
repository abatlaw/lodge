"use client";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function WeeklyCalendar({
  events,
  onEventAdd,
  onEventChange,
  onEventRemove,
}: any) {
  return (
    <div
      style={{
        flex: 1,
        minHeight: 0, // 🔑 REQUIRED for scrolling in flex layouts
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style jsx global>{`
        @media (prefers-color-scheme: dark) {
          .fc {
            background-color: #0b0b0d;
            color: #e5e7eb;
          }

          .fc-scrollgrid,
          .fc-scrollgrid-section,
          .fc-scrollgrid-sync-table,
          .fc-timegrid,
          .fc-timegrid-body {
            background-color: #0b0b0d;
          }

          .fc-theme-standard td,
          .fc-theme-standard th {
            border-color: #1f1f23;
          }

          .fc-timegrid-slot-label {
            color: #9ca3af;
          }

          .fc-day-today {
            background-color: rgba(234, 179, 8, 0.12);
          }

          .fc-col-header,
          .fc-col-header-cell {
            background-color: #0b0b0d;
          }

          .fc-theme-standard,
          .fc-scrollgrid {
            border: none !important;
          }

          .fc-header-toolbar {
            padding-right: 16px;
          }

          .fc-col-header-cell-cushion {
            color: #ffffff;
            font-weight: 500;
          }
        }
      `}</style>

      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        height="100%"
        expandRows
        slotDuration="00:30:00"
        slotMinTime="06:00:00"
        slotMaxTime="23:00:00"
        allDaySlot={false}
        editable
        droppable
        eventOverlap={false}
        events={events}
        eventReceive={onEventAdd}
        eventChange={onEventChange}
        eventClick={onEventRemove}
      />
    </div>
  );
}
