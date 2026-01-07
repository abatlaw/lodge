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
        minHeight: 0,              // 🔑 CRITICAL for flexbox scrolling
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style jsx global>{`
        @media (prefers-color-scheme: dark) {
          /* Overall calendar */
          .fc {
            background-color: #0b0b0d;
            color: #e5e7eb;
          }

          /* Main grid backgrounds */
          .fc-scrollgrid,
          .fc-scrollgrid-section,
          .fc-scrollgrid-sync-table,
          .fc-timegrid,
          .fc-timegrid-body {
            background-color: #0b0b0d;
          }

          /* Grid lines */
          .fc-theme-standard td,
          .fc-theme-standard th {
            border-color: #1f1f23;
          }

          /* Time labels (left column) */
          .fc-timegrid-slot-label {
            color: #9ca3af;
          }

          /* Today column highlight */
          .fc-day-today {
            background-color: rgba(234, 179, 8, 0.12);
          }

          /* Column headers */
          .fc-col-header,
          .fc-col-header-cell {
            background-color: #0b0b0d;
          }

          /* Remove outer border */
          .fc-theme-standard,
          .fc-scrollgrid {
            border: none !important;
          }

          /* Toolbar spacing */
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
        height="100%"               // 🔑 now works because parent has height
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
