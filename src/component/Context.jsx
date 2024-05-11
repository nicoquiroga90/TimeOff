import React, { createContext, useEffect, useState } from "react";
import { apiPath } from "../api";
import Loading from "./Loading"; // Importa tu componente Loading aquí

const TeamDataContext = createContext();

const TeamDataProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  const [members, setMembers] = useState([]);
  const [timeOff, setTimeOff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataIsOld, setDataIsOld] = useState(false);

const refreshTeamData = () => {
    setDataIsOld(true);
  };

  const fetchData = async () => {
    try {
      setLoading(true); // Establecer loading a true al inicio de la carga
      const [teamsResponse, membersResponse, timeOffResponse] =
        await Promise.all([
          fetch(apiPath("/teams")),
          fetch(apiPath("/members")),
          fetch(apiPath("/timeoff")),
        ]);

      const teamsData = await teamsResponse.json();
      const membersData = await membersResponse.json();
      const timeOffData = await timeOffResponse.json();
      
      setTeams(teamsData);
      setMembers(membersData);
      setTimeOff(timeOffData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Establecer loading a false cuando se completó la carga o ocurrió un error
    }
  };

  

  useEffect(() => {
    if (dataIsOld) {
      fetchData();
      setDataIsOld(false);
    }
  }, [dataIsOld]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TeamDataContext.Provider
      value={{ teams, members, timeOff, setMembers, refreshTeamData }}
    >
      {/* Mostrar el componente de carga solo mientras loading es true */}
      {loading ? (
        <Loading open={true} />
      ) : (
        children // Renderizar children una vez que loading es false y los datos están cargados
      )}
    </TeamDataContext.Provider>
  );
};

export { TeamDataContext, TeamDataProvider };
