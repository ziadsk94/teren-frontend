import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import API from "../utils/api";

export default function CreateBooking({ venues }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    venue: "",
    date: "",
    timeSlot: "",
    gameType: "5v5",
  });
  const [availableSlots, setAvailableSlots] = useState([]);

  const checkAvailability = async () => {
    try {
      const { data } = await API.get(
        `/bookings?venueId=${formData.venue}&date=${formData.date}`
      );
      const takenSlots = data.map((booking) => booking.timeSlot);
      // Generate all possible slots and filter
      const allSlots = ["09:00-10:00", "10:00-11:00", "11:00-12:00" /* ... */];
      setAvailableSlots(allSlots.filter((slot) => !takenSlots.includes(slot)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card">
      <h3>{t("createBooking")}</h3>
      <form className="flex-column">
        <select
          value={formData.venue}
          onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
          required
        >
          <option value="">{t("selectVenue")}</option>
          {venues.map((venue) => (
            <option key={venue._id} value={venue._id}>
              {venue.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          onBlur={checkAvailability}
          required
        />

        <select
          value={formData.timeSlot}
          onChange={(e) =>
            setFormData({ ...formData, timeSlot: e.target.value })
          }
          required
        >
          <option value="">{t("selectTime")}</option>
          {availableSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>

        <select
          value={formData.gameType}
          onChange={(e) =>
            setFormData({ ...formData, gameType: e.target.value })
          }
        >
          <option value="5v5">5 vs 5</option>
          <option value="6v6">6 vs 6</option>
          <option value="7v7">7 vs 7</option>
        </select>

        <button type="submit" className="primary">
          {t("createBooking")}
        </button>
      </form>
    </div>
  );
}
