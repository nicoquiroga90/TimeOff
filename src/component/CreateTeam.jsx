import { useState } from "react";
import "../index.css";
import { apiPath } from "../api";
import "../styles/navbar.css";
import Loading from "./Loading"; 

const CreateTeam = ({ setTeamsDatabase }) => {
  const [isLoading, setIsLoading] = useState(false); 

  const handleCreateTeam = async () => {
    try {
      setIsLoading(true); 
      const randomCode = Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

      const newName = prompt("Enter new team name:");

      if (!newName) {
        setIsLoading(false); 
        return;
      }

      const response = await fetch( "http://localhost:4051/api/teams" || apiPath("/teams"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ team_name: newName, team_code: randomCode }),
      });

      if (!response.ok) {
        throw new Error("Failed to create team");
      }

      setTeamsDatabase((prevTeams) => [
        ...prevTeams,
        { id: prevTeams.length + 1, name: newName, code: randomCode },
      ]);
      window.alert(`New team created: ${newName} (Code: ${randomCode})`);
    } catch (error) {
      console.error("Error creating team:", error);
      window.alert("Failed to create team");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <button className="button-create-team" onClick={handleCreateTeam}>
          Create Team
        </button>
      )}
    </div>
  );
};

export default CreateTeam;
