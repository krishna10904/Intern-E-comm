import React from "react";

function RecentActivity() {
  const activities = [
    { activity: 'User "John" registered', time: "10 mins ago" },
    { activity: "Order #123 placed", time: "20 mins ago" },
    { activity: "Product added", time: "1 hour ago" },
  ];

  return (
    <div className="activity-section">
      <h3>Recent Activities</h3>
      <table>
        <thead>
          <tr>
            <th>Activity</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((item, index) => (
            <tr key={index}>
              <td>{item.activity}</td>
              <td>{item.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentActivity;