import React, { useEffect, useState } from "react";
import "./Profile.css";

const Profile = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile</h1>

      {user ? (
        <div className="profile-card">
          <div className="profile-avatar">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>

          <div className="profile-details">
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>User ID: {user._id}</p>
          </div>
        </div>
      ) : (
        <h2 className="no-user">No User Logged In</h2>
      )}
    </div>
  );
};

export default Profile;