"use client";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function WeeklyCalendar({
  events,
  height,
  onEventAdd,
  onEventChange,
  onEventRemove,
}) {
  return (
    <div>
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

          /* Today column highlight (very subtle) */
          .fc-day-today {
            background-color: rgba(234, 179, 8, 0.12);
          }
          /* Column headers (Sun, Mon, Tue...) */
          .fc-col-header,
          .fc-col-header-cell {
            background-color: #0b0b0d;
          }

          /* Remove outer calendar border */
          .fc-theme-standard,
          .fc-scrollgrid {
            border: none !important;
          }

          /* Give calendar toolbar breathing room on the right */
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
        slotDuration="00:30:00"
        allDaySlot={false}
        editable
        droppable
        eventOverlap={false}
        height={height}
        events={events}
        eventReceive={onEventAdd}
        eventChange={onEventChange}
        eventClick={onEventRemove}
        slotMinTime="06:00:00"
        slotMaxTime="23:00:00"
      />


    </div>
  );
}
