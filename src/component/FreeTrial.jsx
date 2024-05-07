import "../styles/freetrial.css"
import CreateTeam from './CreateTeam';

const FreeTrial = () => {
  return (
    <div className="free-trial">
      <div className="trial-content">
        <h2>Try Our App for Free!</h2>
        <p>
          Experience the power of TimeOFF with our free trial version. <br /> <br />Create your team, add members, and start using our calendar hassle-free.
        </p>
        <p>
          Have suggestions to enhance your experience? We're all ears!
        </p>
        <p>
          Get Started Now!
        </p>
        <CreateTeam />
      </div>
      <div className="sun"></div>
    </div>
  );
}

export default FreeTrial;
