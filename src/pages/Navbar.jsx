import { useState, useEffect } from 'react';
import CreateTeam from '../component/CreateTeam';
import { apiPath } from '../api';
import '../styles/navbar.css'; 
import { HashLink as Link } from "react-router-hash-link";

function Navbar({theme, setTheme}) {
  const [teamsDatabase, setTeamsDatabase] = useState([]);

  const toggle_mode = ()=>{
    theme === 'light' ?  setTheme('dark') : setTheme('light');
  } 

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const url = apiPath('/teams'); 
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch teams');
      }
      const teams = await response.json();
      setTeamsDatabase(teams);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };
  return (
    <div className="navbar">

      <img src="/logo.png" alt="Logo" className="logo" />

      <div className="navbar-center">
        <Link to="#about" smooth>
          <span className="navbar-text">About</span>
        </Link>
        <span className="navbar-text">|</span>
        <Link to="#contact" smooth>
          <span className="navbar-text">Contact</span>
        </Link>
        <span className="navbar-text">|</span>
        <Link to="#pricing" smooth>
          <span className="navbar-text">Pricing</span>
        </Link>
      </div>

      <div className="container-create-team">
        <CreateTeam setTeamsDatabase={setTeamsDatabase} />
      </div>

       {/* <img onClick={()=>{toggle_mode()}} src={theme === 'light' ? "/day.png" : "/night.png"} alt="" className='toggle-icon'/> */}
    </div>
  );
}

export default Navbar;
