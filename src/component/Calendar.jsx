import { useEffect, useState, useContext } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { TeamDataContext } from "../component/Context";
import { apiPath } from "../api";
import DeleteTimeOff from "../component/DeleteTimeOff";
import "../styles/calender.css";

function MyCalendar() {
  const localizer = dayjsLocalizer(dayjs);
  const { teams, members } = useContext(TeamDataContext);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const teamCode = window.location.pathname.split("/").pop();
    const team = teams.find((team) => team.team_code === teamCode);

    if (!team) return;

    const teamMembers = members.filter((member) => member.team_id === team.id);

    const fetchEvents = async () => {
      try {
        const responseEvents = await fetch(apiPath(`/timeoff`));
        const eventsData = await responseEvents.json();
        const teamMemberIds = teamMembers.map((member) => member.id);
        const teamEvents = eventsData.filter((event) =>
          teamMemberIds.includes(event.member_id)
        );

        const formattedEvents = teamEvents.map((event) => {
          const member = teamMembers.find(
            (member) => member.id === event.member_id
          );
          return {
            id: event.id,
            start: new Date(event.start_date),
            end: new Date(event.end_date),
            title: member ? `${member.first_name} ${member.last_name}` : "",
            description: event.description,
            backgroundColor: member ? member.color : "#000000",
            memberName: member
              ? `${member.first_name} ${member.last_name}`
              : "",
          };
        });

        setEvents(formattedEvents);

      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [teams, members]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const onDeleteConfirmation = async () => {
    setEvents(events.filter((event) => event.id !== selectedEvent.id));
    setSelectedEvent(null);
  };

  const handleCloseDialog = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="calender-container">
      <Calendar
        popup={false}
        localizer={localizer}
        events={events}
        onSelectEvent={handleEventClick}
        views={["month", "week"]}
        eventPropGetter={(event, start, end, isSelected) => {
          const style = {
            borderRadius: "10px",
            border: "none",
            backgroundColor: event.backgroundColor,
          };
          return { style };
        }}
        style={{
          height: "35em",
          width: "100%",
        }}
      />
      {selectedEvent && (
        <div>
          <DeleteTimeOff
            eventId={selectedEvent.id}
            eventDescription={selectedEvent.description}
            memberName={selectedEvent.memberName}
            onDelete={onDeleteConfirmation}
            onCloseDialog={handleCloseDialog}
          />
        </div>
      )}
    </div>
  );
}

export default MyCalendar;
