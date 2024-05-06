import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { apiPath } from "../api";
import { TeamDataContext } from "../component/Context";
import "../styles/createMember.css";

function CreateMember() {
  const { code } = useParams();
  const { teams, refreshTeamData } = useContext(TeamDataContext);

  const [teamId, setTeamId] = useState(null);
  const [memberData, setMemberData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    color: "#000000",
    allowed_dayoff: 0,
  });

  useEffect(() => {
    const team = teams.find((team) => team.team_code === code);
    if (team) {
      setTeamId(team.id);
    } else {
      console.error(`Team with code_team '${code}' not found.`);
    }
  }, [code, teams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(apiPath("/members"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...memberData,
          team_id: teamId,
          assigned_dayoff: 0,
        }),
      });

      if (response.ok) {
        alert("Member created successfully!");
        refreshTeamData();
        setMemberData({
          first_name: "",
          last_name: "",
          email: "",
          color: "#000000",
          allowed_dayoff: 0,
        });
      } else {
        const data = await response.json();
        alert(data.error || "Failed to create member. Please try again.");
      }
    } catch (error) {
      console.error("Error creating member:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMemberData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="member-form">
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={memberData.first_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={memberData.last_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={memberData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Color:</label>
          <input
            type="color"
            name="color"
            value={memberData.color}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Allowed Dayoff:</label>
          <input
            type="number"
            name="allowed_dayoff"
            value={memberData.allowed_dayoff}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Member</button>
      </form>
    </div>
  );
}

export default CreateMember;
