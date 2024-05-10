import MyCalendar from "../component/Calendar";
import CreateTimeoff from "../component/CreateTimeoff";
import TeamMembers from "../component/TeamDetails";
import WelcomeTeam from "../component/WelcomeTeam";
import "../styles/dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-conteiner">
      <section className="welcome-team">
        <WelcomeTeam />
      </section>
      <div className="container-section">
        <section className="left-section">
          <section className="MyCalendar">
            <MyCalendar />
          </section>
          <CreateTimeoff />
        </section>
        <section className="right-section">
          <TeamMembers />
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
