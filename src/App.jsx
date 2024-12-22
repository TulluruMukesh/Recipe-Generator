import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FrontPage from "./components/FrontPage";
import Recipe from "./components/Recipe"

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<FrontPage />} />
              <Route path="/recipe/:recipeName" element={<Recipe />} />
          </Routes>
      </Router>
  );
}

export default App;