import React from "react";
import "./Dashboard.css";

function Dashboard() {

  const stats = [
    { title: "Total Products", value: 25, icon: "📦", color: "#9fb7d9" },
    { title: "Total Orders", value: 12, icon: "🛒", color: "#a9cbb7" },
    { title: "Total Users", value: 5, icon: "👤", color: "#e9d39c" },
    { title: "Pending Deliveries", value: 3, icon: "🔔", color: "#e79a8d" },
  ];

  const activities = [
    { text: 'User "JohnDoe" registered', time: "10 mins ago" },
    { text: 'Order #123 placed by User "subh"', time: "20 mins ago" },
    { text: 'Product "iPhone 13" added', time: "1 hour ago" },
    { text: 'Order #122 marked as delivered to "alice"', time: "3 hours ago" },
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>

      {/* Stats Cards */}
      <div className="stats-wrapper">
        {stats.map((item, index) => (
          <div
            key={index}
            className="stats-card"
            style={{ backgroundColor: item.color }}
          >
            <div className="icon-box">{item.icon}</div>

            <div>
              <p className="card-title">{item.title}</p>
              <h2 className="card-value">{item.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="recent-container">
        <h2 className="recent-title">Recent Activities</h2>

        <div className="activity-header">
          <span>Activity</span>
          <span>Time</span>
        </div>

        {activities.map((item, index) => (
          <div key={index} className="activity-row">
            <span>{item.text}</span>
            <span>{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;