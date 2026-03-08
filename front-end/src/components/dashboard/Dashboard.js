import React, { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard() {

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    pendingDeliveries: 0
  });

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      let result = await fetch("https://intern-e-comm1.onrender.com/dashboard-stats");
      result = await result.json();

      setStats(result);

      // Generate simple real activity logs
      setActivities([
        { text: `Total ${result.totalUsers} users registered`, time: "Just now" },
        { text: `${result.totalProducts} products available`, time: "Updated" },
        { text: `${result.totalOrders} cart items created`, time: "Live Data" }
      ]);

    } catch (err) {
      console.log("Dashboard fetch error:", err);
    }
  };

  const statsData = [
    { title: "Total Products", value: stats.totalProducts, icon: "📦", color: "#9fb7d9" },
    { title: "Total Orders", value: stats.totalOrders, icon: "🛒", color: "#a9cbb7" },
    { title: "Total Users", value: stats.totalUsers, icon: "👤", color: "#e9d39c" },
    { title: "Pending Deliveries", value: stats.pendingDeliveries, icon: "🔔", color: "#e79a8d" },
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>

      {/* Stats Cards */}
      <div className="stats-wrapper">
        {statsData.map((item, index) => (
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