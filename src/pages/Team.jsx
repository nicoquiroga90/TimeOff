import MyCalendar from "../component/Calendar";
import CreateTimeoff from "../component/CreateTimeoff";
import DeleteTeam from "../component/DeleteMember";
import TeamMembers from "../component/TeamDetails";
import WelcomeTeam from "../component/WelcomeTeam";
import "../styles/team.css";

function Team() {
  return (
    <>
      <section className="welcome-team">
        <WelcomeTeam />
      </section>
      <div className="container-section">
        <section className="left-section">
          <section className="TeamMember">
            <TeamMembers />
          </section>
          <section className="MyCalendar">
            <MyCalendar />
          </section>
        </section>
        <section className="right-section">
          <section className="CreateMember">
            
            <DeleteTeam />
            <CreateTimeoff />
          </section>
        </section>
      </div>
    </>
  );
}

export default Team;
