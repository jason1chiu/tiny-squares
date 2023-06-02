import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

function EventCalendar(props) {
  const { calendarData, initialDate } = props;

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      headerToolbar={false}
      initialView='dayGridMonth'
      contentHeight='600px'
      events={calendarData}
      initialDate={initialDate}
      editable={true}
      minHeight='400px'
      height='100%'
      slotWidth={10}
      customIcons={false}
    />
  );
}

export default EventCalendar;