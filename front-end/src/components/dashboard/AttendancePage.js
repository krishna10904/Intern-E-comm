import React, { useState } from "react";
import "./Attendance.css";

const AttendancePage = () => {

  const [selectedDate, setSelectedDate] = useState("");

  const records = [
    { name: "Krishna", date: "2026-03-01", time: "10:00 AM" },
    { name: "John", date: "2026-03-02", time: "09:45 AM" },
  ];

  const filteredRecords = selectedDate
    ? records.filter(record => record.date === selectedDate)
    : records;

  return (
    <div className="attendance-container">

      <h1 className="attendance-title">Attendance Page</h1>

      {/* Calendar Section */}
      <div className="calendar-card">
        <label>Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Records Section */}
      <div className="records-card">
        <h2>Login Records</h2>

        {filteredRecords.length > 0 ? (
          filteredRecords.map((item, index) => (
            <div key={index} className="record-row">
              <span>{item.name}</span>
              <span>{item.date}</span>
              <span>{item.time}</span>
            </div>
          ))
        ) : (
          <p className="no-record">No records found</p>
        )}

      </div>

    </div>
  );
};

export default AttendancePage;