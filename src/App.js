import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { TeamDataProvider } from "./component/Context"; 

function App() {
  return (
    <div className="App">
      <Router>
        <TeamDataProvider> 
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/team/:code" element={<Dashboard />} />
            <Route path="*" element={<h1>404 Page not found</h1>} />
          </Routes>
        </TeamDataProvider>
      </Router>
    </div>
  );
}

export default App;
