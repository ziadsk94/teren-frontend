import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

export default function SignIn() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/signin", formData);
      localStorage.setItem("token", data.token);
      navigate(data.role === "venue_manager" ? "/dashboard" : "/");
    } catch (err) {
      setError(err.response?.data?.message || t("signInError"));
    }
  };

  return (
    <div className="card">
      <h2>{t("signIn")}</h2>
      {error && <p style={{ color: "var(--accent-red)" }}>{error}</p>}
      <form onSubmit={handleSubmit} className="flex-column">
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
          {t("signIn")}
        </button>
      </form>
    </div>
  );
}
