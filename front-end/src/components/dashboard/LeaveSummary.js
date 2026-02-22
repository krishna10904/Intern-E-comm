import React from "react";

function LeaveSummary() {
  // Dummy leave data
  const pending = 4;
  const approved = 10;
  const rejected = 2;

  return (
    <div className="stats-card">
      <h4>Leave Requests</h4>
      <p>Pending: {pending}</p>
      <p>Approved: {approved}</p>
      <p>Rejected: {rejected}</p>
    </div>
  );
}

export default LeaveSummary;