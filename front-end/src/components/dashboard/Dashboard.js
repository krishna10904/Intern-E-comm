import React from "react";
import StatsCard from "./StatsCard";
import RecentActivity from "./RecentActivity";
import AttendanceCard from "./AttendanceCard";
import LeaveSummary from "./LeaveSummary";
import "./Dashboard.css";

function Dashboard() {

  const stats = [
    { title: "Total Products", value: 25 },
    { title: "Total Orders", value: 12 },
    { title: "Total Users", value: 5 },
    { title: "Pending Deliveries", value: 3 },
    { title: "Today Orders", value: 5 },
  ];

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>

      {/* Main Stats */}
      <div className="main-stats">
        {stats.map((item, index) => (
          <StatsCard
            key={index}
            title={item.title}
            value={item.value}
          />
        ))}
      </div>

      {/* Extra Cards */}
      <div className="extra-stats">
        <AttendanceCard />
        <LeaveSummary />
      </div>

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
}

export default Dashboard;