import MyCalendar from "../component/Calendar";
import CreateTimeoff from "../component/CreateTimeoff";
import TeamMembers from "../component/TeamDetails";
import WelcomeTeam from "../component/WelcomeTeam";
import "../styles/dashboard.css";

function Dashboard() {
  return (
<div className="dashboard-conteiner">

        <WelcomeTeam />

<div className="dashboard-main">
<div className="left-section">
            <MyCalendar />
          <CreateTimeoff />
</div>
<div className="right-section">
          <TeamMembers />
</div>
</div>
</div>
  );
}

export default Dashboard;
