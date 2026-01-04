import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [username, setUsername] = useState(null); // Initialize as null
  const navigate = useNavigate();

  useEffect(() => {
    // 1. REMOVED THE FORCED REDIRECT HERE
    // We only want to check if the user exists, not kick them out if they don't.
    const user = localStorage.getItem("username");
    if (user) {
      setUsername(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUsername(null); // Clear state immediately
    navigate("/login");
  };

  const initial = username ? username.charAt(0).toUpperCase() : "U";

  return (
    <header>
      <div className="navbar">
        <Link to="/blogs" className="logo">
          Mind
        </Link>

        <button
          className="hamburger"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav-links ${isMobileOpen ? "active" : ""}`}>
          {/* --- CONDITIONAL RENDERING --- */}

          {username ? (
            /* LOGGED IN VIEW */
            <>
              <Link to="/blogs" className="nav-link">
                Home
              </Link>
              <Link to={"/dashboard"} className="nav-link">
                Dashboard
              </Link>
              <Link to="/create" className="nav-link create-btn">
                Write Post
              </Link>

              {/* User Dropdown */}
              <div className="user-menu-container">
                <div className="user-avatar">{initial}</div>
                <div className="dropdown-menu">
                  <div className="user-name-display">
                    Signed in as <br />
                    <strong>{username}</strong>
                  </div>
                  <Link to="/profile" className="dropdown-item">
                    Profile
                  </Link>
                  <Link to="/settings" className="dropdown-item">
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="dropdown-item logout-item"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* LOGGED OUT / GUEST VIEW */
            <>
              <Link to="/blogs" className="nav-link">
                Blogs
              </Link>
              <Link to="/login" className="nav-link">
                Sign In
              </Link>
              {/* Reusing 'create-btn' class to make 'Get Started' look like a primary button */}
              <Link to="/signup" className="nav-link create-btn">
                Get Started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
