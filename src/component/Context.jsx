import { createContext, useEffect, useState } from "react";
import { apiPath } from "../api";
import Loading from "./Loading";

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
      setLoading(true);
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
      setLoading(false);
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
      {loading ? <Loading open={true} /> : children}
    </TeamDataContext.Provider>
  );
};

export { TeamDataContext, TeamDataProvider };
