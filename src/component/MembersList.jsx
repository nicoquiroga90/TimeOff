import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Member from "../pages/Member";
import { apiPath } from '../api';
import '../styles/memberList.css';

const MembersList = ({ teamId }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState(null);
  const { code } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamResponse, membersResponse] = await Promise.all([
          fetch(apiPath(`/teams/${code}`)),
          fetch(apiPath('/members'))
        ]);

        if (!teamResponse.ok) {
          throw new Error("Failed to fetch team");
        }

        if (!membersResponse.ok) {
          throw new Error("Failed to fetch members");
        }

        const teamData = await teamResponse.json();
        const membersData = await membersResponse.json();

        setTeam(teamData);
        setMembers(membersData.filter(member => member.team_id === teamId));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [code, teamId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="containerList">
      <div className="titleContainer">
       <div className="titleContainer-heading">
          {team && (
            <>
              <h1>Welcome Back, <span>{team.team_name}</span></h1>
              <h3>Here is a list of your team members!</h3>
            </>
          )}
        </div>
        <img src="/logo.svg" alt="Logo" className="logo" />
      </div>
      <div className="members-grid">
        {members.map((member) => (
          <Member key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default MembersList;