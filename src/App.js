import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginRegister from "./LoginRegistrater/LoginRegister";
import Dashboard from "./Pages/dashboard";
import QuizPage from "./Pages/quizpage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <LoginRegister setIsAuthenticated={setIsAuthenticated} />
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/" />
          }
        />
        <Route
          path="/quiz"
          element={
            isAuthenticated ? <QuizPage /> : <Navigate to="/" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
