import MyCalendar from "../component/Calendar";
import CreateMember from "../component/CreateMember";
import CreateTimeoff from "../component/CreateTimeoff";
import DeleteTeam from "../component/DeleteMember";
import TeamMembers from "../component/TeamDetails";
import MembersList from "../component/MembersList";
import "../styles/team.css";

function Team() {
  return (
    <>
      <section className="welcome-team">
        <MembersList />
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
            <CreateMember />
            <DeleteTeam />
            <CreateTimeoff />
          </section>
        </section>
      </div>
    </>
  );
}

export default Team;
