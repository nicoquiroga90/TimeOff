import { useEffect, useState, useContext } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { TeamDataContext } from "../component/Context";
import { apiPath } from "../api";
import "../styles/calender.css";
import "../styles/deleteTimeoff.css";

function MyCalendar() {
  const localizer = dayjsLocalizer(dayjs);
  const { teams, members, refreshTeamData } = useContext(TeamDataContext);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

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
          };
        });

        setEvents(formattedEvents);
        refreshTeamData();
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [teams, members]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleDeleteEvent = async () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      await fetch(apiPath(`/timeoff`), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: selectedEvent.id }),
      });
      setEvents(events.filter((event) => event.id !== selectedEvent.id));
      setSelectedEvent(null);
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="calender-container">
      <Calendar
        localizer={localizer}
        events={events}
        onSelectEvent={handleEventClick}
        eventPropGetter={(event, start, end, isSelected) => {
          const style = {
            borderRadius: "0px",
            border: "none",
            fontSize: "10px",
            height: "20px",
            overflow: "hidden",
            padding: "2px",
            margin: "2px",
            backgroundColor: event.backgroundColor,
          };
          return { style };
        }}
        style={{
          height: 500,
          width: 500,
        }}
      />
      {selectedEvent && (
        <div>
          <h3>{selectedEvent.title}</h3>
          <p>{selectedEvent.description}</p>
          <button onClick={handleDeleteEvent}>Delete Event</button>
          {showDeleteConfirmation && (
            <div className="delete-confirmation">
              <p>Are you sure you want to delete this event?</p>
              <button onClick={confirmDelete}>Yes</button>
              <button onClick={cancelDelete}>No</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MyCalendar;
