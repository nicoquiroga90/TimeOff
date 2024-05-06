import { useState, useContext } from "react";
import { apiPath } from "../api";
import { TeamDataContext } from "../component/Context";
import "../styles/createTimeoff.css";

function CreateTimeoff() {
  const { members, teams } = useContext(TeamDataContext);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  const currentTeam = teams.find(
    (team) => team.team_code === window.location.pathname.split("/").pop()
  );
  const currentTeamMembers = members.filter(
    (member) => member.team_id === currentTeam.id
  );

  const handleMemberChange = (e) => {
    setSelectedMember(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const start = new Date(startDate);
    const end = new Date(endDate);
    const numberOfDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    if (numberOfDays <= 0) {
      alert("End date must be after start date.");
      return;
    }

    if (!selectedMember) {
      alert("Please select a member.");
      return;
    }

    const selectedMemberData = currentTeamMembers.find(
      (member) => member.id === parseInt(selectedMember)
    );
    if (!selectedMemberData) {
      alert("Please select a valid member.");
      return;
    }

    if (
      numberOfDays >
      selectedMemberData.allowed_dayoff - selectedMemberData.assigned_dayoff
    ) {
      alert("You cannot book more days off than your maximum allowed.");
      return;
    }

    try {
      const response = await fetch(apiPath(`/timeoff/${selectedMember}`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start_date: startDate,
          end_date: endDate,
          description: description,
          member_id: selectedMember,
        }),
      });

      if (response.ok) {
        alert("Time off booked successfully!");
        setIsFormVisible(false);
      } else {
        const data = await response.json();
        alert(data.error || "Failed to book time off. Please try again.");
      }
    } catch (error) {
      console.error("Error booking time off:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="createTimeOff-container">
      <button className="book-timeoff" onClick={() => setIsFormVisible(true)}>
        Book Time Off
      </button>
      {isFormVisible && (
        <form className="createTimeoff-form" onSubmit={handleSubmit}>
          <div>
            <label>Member:</label>
            <select
              className="createTimeForm-select"
              value={selectedMember}
              onChange={handleMemberChange}
            >
              <option value="">Select Member</option>
              {currentTeamMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.first_name} {member.last_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label>End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default CreateTimeoff;