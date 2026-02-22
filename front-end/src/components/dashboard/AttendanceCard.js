import React from "react";

function AttendanceCard() {
  // Dummy data (later backend se connect kar sakte ho)
  const activeUsersToday = 18;
  const totalLoginsToday = 32;

  return (
    <div className="stats-card">
      <h4>Active Users Today</h4>
      <h2>{activeUsersToday}</h2>
      <p>Total Logins: {totalLoginsToday}</p>
    </div>
  );
}

export default AttendanceCard;
