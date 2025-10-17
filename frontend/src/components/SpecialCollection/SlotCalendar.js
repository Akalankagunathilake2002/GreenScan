import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function SlotCalendar({ availableSlots = [], onDateSelect }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const availableDates = [
    ...new Set(
      availableSlots
        .filter((s) => s && s.date)
        .map((s) => new Date(s.date).toDateString())
    ),
  ];

  const tileDisabled = ({ date, view }) =>
    view === "month" ? !availableDates.includes(date.toDateString()) : false;

  const tileClassName = ({ date, view }) =>
    view === "month" && availableDates.includes(date.toDateString())
      ? "bg-green-200 text-green-800 font-semibold rounded-full"
      : "";

  const handleChange = (date) => {
    setSelectedDate(date);
    onDateSelect?.(date.toLocaleDateString("en-CA"));
  };

  return (
    <div className="flex flex-col items-center">
      <Calendar
        onChange={handleChange}
        value={selectedDate}
        tileDisabled={tileDisabled}
        tileClassName={tileClassName}
      />
      {selectedDate && (
        <p className="mt-2 text-gray-700">
          Selected: {selectedDate.toDateString()}
        </p>
      )}
    </div>
  );
}
