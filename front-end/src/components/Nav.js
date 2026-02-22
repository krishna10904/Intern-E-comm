import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div>
      {auth ? (
        <ul className="nav-ul">

          {/* Dashboard */}
          <li><Link to="/">Dashboard</Link></li>

          {/* Products */}
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/add">Add Product</Link></li>

          {/* Profile */}
          <li><Link to="/profile">Profile</Link></li>

          <Link to="/attendance">Attendance</Link>
          
          <Link to="/leave">Leave Requests</Link>
          {/* Logout */}
          <li>
            <Link onClick={logout} to="/login">
              Logout ({JSON.parse(auth).name})
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