import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./Leave.css";

const LeavePage = () => {

  const [leaves, setLeaves] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const result = await fetch("http://localhost:5000/leaves", {
        headers: {
          authorization: JSON.parse(localStorage.getItem("token"))
        }
      });

      const data = await result.json();
      setLeaves(data);

      const formattedEvents = data.map((item) => ({
        title: item.name,
        start: item.fromDate.split("T")[0],
        end: item.toDate.split("T")[0],
        color:
          item.status === "approved"
            ? "#51cf66"
            : item.status === "rejected"
            ? "#ff6b6b"
            : "#ffd43b"
      }));

      setEvents(formattedEvents);

    } catch (err) {
      console.log(err);
    }
  };

  const pending = leaves.filter(l => l.status === "pending").length;
  const approved = leaves.filter(l => l.status === "approved").length;
  const rejected = leaves.filter(l => l.status === "rejected").length;

  return (
    <div className="leave-page">

      {/* TOP SECTION */}
      <div className="leave-top">

        {/* Calendar */}
        <div className="leave-card calendar-card">
          <h3>Leave Calendar</h3>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            height="450px"
          />
        </div>

        {/* Summary Panel */}
        <div className="leave-card summary-card">
          <h3>Summary</h3>

          <div className="summary-item pending">
            Pending: {pending}
          </div>

          <div className="summary-item approved">
            Approved: {approved}
          </div>

          <div className="summary-item rejected">
            Rejected: {rejected}
          </div>

        </div>

      </div>

      {/* TABLE SECTION */}
      <div className="leave-card table-card">

        <h3>Leave Requests</h3>

        <div className="leave-table">

          <div className="leave-row header">
            <div>Name</div>
            <div>From</div>
            <div>To</div>
            <div>Reason</div>
            <div>Status</div>
          </div>

          {leaves.map((item) => (
            <div key={item._id} className="leave-row">
              <div>{item.name}</div>
              <div>{item.fromDate.split("T")[0]}</div>
              <div>{item.toDate.split("T")[0]}</div>
              <div>{item.reason}</div>
              <div>
                <span className={`status ${item.status}`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default LeavePage;