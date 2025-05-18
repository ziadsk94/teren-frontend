import React from "react";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <section>
      <h2>{t("soccerGames")}</h2>
      <p>{t("welcome")}</p>
      {/* Here you will add map, list of venues, filters etc */}
    </section>
  );
}
