import "../styles/home.css";
import { apiPath } from "../api";
import { useState, useEffect } from "react";
import SubmitTeam from "../component/SubmitTeam";
import Navbar from "./Navbar";
import Testimonials from "../component/Testimonials";
import About from "../component/About";
import Footer from "./Footer";
import FreeTrial from "../component/FreeTrial";

const Home = () => {
  const [teamsDatabase, setTeamsDatabase] = useState([]);
  const current_theme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState(current_theme ? current_theme : 'light');

  useEffect (()=>{
    localStorage.setItem('current_theme', theme);
  },[theme]);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const url = apiPath("/teams");
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch teams");
      }
      const teams = await response.json();
      setTeamsDatabase(teams);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  return (
    <div className={`home-container ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme} />
      <section className="main-section">
        <div className="headers-container">
          <h2 className="main-header">TimeOFF</h2>
          <h3 className="main-subheader">
            TimeOFF is a web application designed to simplify the process of
            managing vacations and time off for teams within a company. <br /><br />It
            provides a user-friendly interface for creating teams, managing team
            members, and tracking their time off.
          </h3>

          <SubmitTeam teamsDatabase={teamsDatabase} />
        </div>
        <div className="main-image-container">
          <img src="/imgTop.png" alt="main-image" className="img-main" />
        </div>
      </section>

      <section className="about-section">
      <About />
      <Testimonials />
     </section>
      <section><FreeTrial /></section>
      <section><Footer /></section>
    </div>
  );
};

export default Home;
