import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TeamDataContext } from "../component/Context";
import "../styles/teamDetails.css";

const TeamMembers = () => {
  const { code } = useParams();
  const { members, teams } = useContext(TeamDataContext);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const teamId = teams.find((team) => team.team_code === code)?.id;

    const filteredMembers = members.filter(
      (member) => member.team_id === teamId
    );
    setTeamMembers(filteredMembers);
  }, [code, members, teams]);

  return (
    <div className="Team-Member-container">
      <h2>Team Members</h2>
      {teamMembers.length === 0 ? (
        <p>
          No team members found. <br />
          Create a new member using the button in the panel.
        </p>
      ) : (
        <ul>
          {teamMembers.map((member) => (
            <li key={member.id}>
              {member.first_name} {member.last_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeamMembers;