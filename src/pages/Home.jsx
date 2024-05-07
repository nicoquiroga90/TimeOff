import { useState, useEffect } from "react";
import SubmitTeam from "../component/SubmitTeam";
import { apiPath } from "../api";
import Navbar from "./Navbar";
import "../styles/home.css";
import Testimonials from "../component/Testimonials";
import PriceCard from "../component/PriceCard";
import About from "../component/About";
import Footer from "./Footer";

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

      <section className="testimonials-container">
      <h2 className="testim-header">Testimonials</h2>
      <Testimonials />
      </section>
      <section><About /></section>
      <section><PriceCard /></section>
      <section><Footer /></section>
    </div>
  );
};

export default Home;
