import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      welcome: "Welcome to Teren",
      signIn: "Sign In",
      signUp: "Sign Up",
      email: "Email",
      password: "Password",
      username: "Username",
      language: "Language",
      soccerGames: "Find, join and create soccer games around you",
      venues: "Venues",
      bookings: "Bookings",
      createBooking: "Create Booking",
      logout: "Logout",
      // add more keys as needed
    },
  },
  ro: {
    translation: {
      welcome: "Bine ai venit la Teren",
      signIn: "Autentificare",
      signUp: "Înregistrare",
      email: "Email",
      password: "Parolă",
      username: "Nume utilizator",
      language: "Limbă",
      soccerGames:
        "Găsește, alătură-te și creează meciuri de fotbal în jurul tău",
      venues: "Locații",
      bookings: "Rezervări",
      createBooking: "Creează rezervare",
      logout: "Deconectare",
      // add more keys as needed
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ro",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
