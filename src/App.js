// src/App.js
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";

// Custom JWT parse function (manual decoding of token payload)
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

function App() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // Auth state: isAuthenticated and user role
  const [auth, setAuth] = useState({ isAuthenticated: false, role: "" });

  // Language state
  const [language, setLanguage] = useState(i18n.language || "ro");

  // On mount, check token and decode role
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = parseJwt(token);
        if (decoded && decoded.role) {
          setAuth({ isAuthenticated: true, role: decoded.role });
        } else {
          // Invalid token payload
          localStorage.removeItem("token");
          setAuth({ isAuthenticated: false, role: "" });
        }
      } catch {
        localStorage.removeItem("token");
        setAuth({ isAuthenticated: false, role: "" });
      }
    }
  }, []);

  // Change language handler
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ isAuthenticated: false, role: "" });
    navigate("/");
  };

  return (
    <div className="container">
      <header
        className="flex"
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          Teren
        </h1>

        <nav className="flex" style={{ gap: "1rem", alignItems: "center" }}>
          <Link to="/">{t("welcome")}</Link>

          {!auth.isAuthenticated && (
            <>
              <Link to="/signin">{t("signIn")}</Link>
              <Link to="/signup">{t("signUp")}</Link>
            </>
          )}

          {auth.isAuthenticated && (
            <>
              <Link to="/dashboard">{t("dashboard")}</Link>
              <button
                onClick={logout}
                className="secondary"
                style={{ padding: "0.5rem 1rem" }}
              >
                {t("logout")}
              </button>
            </>
          )}

          <select
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
            aria-label={t("language")}
            style={{
              padding: "0.5rem",
              borderRadius: "0.5rem",
              border: "1px solid var(--light-gray)",
            }}
          >
            <option value="ro">Română</option>
            <option value="en">English</option>
          </select>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signin"
            element={
              auth.isAuthenticated ? (
                <p>{t("alreadySignedIn")}</p>
              ) : (
                <SignIn setAuth={setAuth} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              auth.isAuthenticated ? <p>{t("alreadySignedIn")}</p> : <SignUp />
            }
          />
          <Route
            path="/dashboard"
            element={
              auth.isAuthenticated ? (
                <Dashboard role={auth.role} />
              ) : (
                <p>{t("pleaseSignIn")}</p>
              )
            }
          />
        </Routes>
      </main>
    </div>
  );
}

// Wrap App with Router to use useNavigate hook inside App
export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
