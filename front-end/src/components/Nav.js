import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {

  const navigate = useNavigate();

  // get user from localStorage safely
  const auth = localStorage.getItem("user");
  let user = null;

  try {
    user = auth ? JSON.parse(auth) : null;
  } catch (error) {
    console.log("Invalid user JSON in localStorage");
    localStorage.removeItem("user");
  }

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      {user ? (
        <ul className="nav-ul">

          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/categories">Categories</Link></li>
          <li><Link to="/add-category">Add Category</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/add">Add Product</Link></li>
          <li><Link to="/orders">Orders</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/attendance">Attendance</Link></li>
          <li><Link to="/leave">Leave Requests</Link></li>
          <li><Link to="/profile">Profile</Link></li>

          <li>
            <Link onClick={logout} to="/login">
              Logout ({user?.name || "User"})
            </Link>
          </li>

        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      )}
    </div>
  );
};

export default Nav;