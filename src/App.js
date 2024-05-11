import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Loading from "./component/Loading";
import { TeamDataProvider } from "./component/Context";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));

function App() {
  return (
    <div className="App">
      <Router>
        <TeamDataProvider>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              exact
              path="/team/:code"
              element={
                <Suspense fallback={<Loading open={true} />}>
                  <Dashboard />
                </Suspense>
              }
            />
            <Route path="*" element={<h1>404 Page not found</h1>} />
          </Routes>
        </TeamDataProvider>
      </Router>
    </div>
  );
}

export default App;
