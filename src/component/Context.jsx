import { createContext, useEffect, useState } from "react";
import { apiPath } from "../api";

const TeamDataContext = createContext();

const TeamDataProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  const [members, setMembers] = useState([]);
  const [timeOff, setTimeOff] = useState([]);
  const [dataIsOld, setDataIsOld] = useState(false);

  const refreshTeamData = () => {
    setDataIsOld(true);
  };

  const fetchData = async () => {
    try {
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
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (dataIsOld) {
      fetchData();
      setDataIsOld(false);
    }
  }, [dataIsOld]);

  return (
    <TeamDataContext.Provider
      value={{ teams, members, timeOff, setMembers, refreshTeamData }}
    >
      {children}
    </TeamDataContext.Provider>
  );
};

export { TeamDataContext, TeamDataProvider };
