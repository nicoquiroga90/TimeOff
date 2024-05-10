import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { TeamDataContext } from "./Context";
import Loading from "./Loading";
import "../styles/welcomeTeam.css";

const WelcomeTeam = () => {
  const { teams } = useContext(TeamDataContext);
  const [isLoading, setLoading] = useState(true);
  const [team, setTeam] = useState(null);
  const { code } = useParams();

  useEffect(() => {
    setLoading(true);
    const fetchTeamData = async () => {
      try {
        const currentTeam = teams.find((team) => team.team_code === code);
        setTeam(currentTeam);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching team data:", error);
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [code, teams]);

  return (
    <div className="containerList">
      <Loading open={isLoading} />
      <div className="titleContainer">
        <div className="titleContainer-heading">
          {team && (
            <>
              <h1>
                Hi Team <span>{team.team_name}!</span>
              </h1>
            </>
          )}
        </div>
        <img src="/logo.png" alt="Logo" className="logo" />
      </div>
    </div>
  );
};

export default WelcomeTeam;
