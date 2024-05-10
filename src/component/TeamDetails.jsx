import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TeamDataContext } from "../component/Context";
import CreateMember from "../component/CreateMember";
import DeleteMember from "./DeleteMember";
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
    <div className="team-member-container">
      <div className="team-list-container">
        <h2 className="team-title"> Team Members:</h2>
        {teamMembers.length === 0 ? (
          <p className="no-team-text">
            No team members found. <br />
            Create a new member using the button in the panel.
          </p>
        ) : (
          <ul className="team-list">
            {teamMembers.map((member) => (
              <li className="team-member" key={member.id}>
                {member.first_name} {member.last_name}
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className="member-action-conteiner">
      <div className="create-member-conteiner">
        <CreateMember />
      </div>
      <div className="delete-member-conteiner">
        <DeleteMember />
      </div>
      </div>
    </div>
  );
};

export default TeamMembers;
