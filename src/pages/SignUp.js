import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

export default function SignUp() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", formData);
      navigate("/signin");
    } catch (err) {
      setError(err.response?.data?.message || t("signUpError"));
    }
  };

  return (
    <div className="card">
      <h2>{t("signUp")}</h2>
      {error && <p style={{ color: "var(--accent-red)" }}>{error}</p>}
      <form onSubmit={handleSubmit} className="flex-column">
        <input
          type="text"
          placeholder={t("username")}
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          required
        />
        <input
          type="email"
          placeholder={t("email")}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder={t("password")}
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <button type="submit" className="primary">
          {t("signUp")}
        </button>
      </form>
    </div>
  );
}
