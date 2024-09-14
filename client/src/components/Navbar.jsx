import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { getUserDetails } from "../util/GetUser";
import { Dropdown } from "antd";
import avatar from "../assets/login.png";

function Navbar({ active }) {
  const [user, setUser] = useState(""); // State to store user details
  const navigate = useNavigate(); // Hook to programmatically navigate to different routes
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to track mobile menu visibility

  // Function to toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Effect to handle screen resize for closing the mobile menu on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Effect to fetch user details when the component mounts
  useEffect(() => {
    const userDetails = getUserDetails();
    setUser(userDetails);
  }, []);

  // Function to handle user logout
  const handleLogout = () => {
    localStorage.removeItem("toDoAppUser");
    navigate("/login");
  };

  // Dropdown menu items for user actions
  const items = [
    {
      key: "1",
      label: <span onClick={handleLogout}> Logout</span>,
    },
  ];

  return (
    <header>
      <nav>
        <div className="logo__wrapper">
          <img src={logo} alt="logo" />
          <h1>To-Do</h1>
        </div>

        <div className="hamburger" onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul
          className={`navigation-menu ${
            isMobileMenuOpen ? "mobile-active" : ""
          }`}
        >
          <li>
            <Link to="/" className={active === "home" && "activeNav"}>
              Home
            </Link>
          </li>
          {user && (
            <li>
              <Link
                to="/to-do-list"
                className={active === "myTask" && "activeNav"}
              >
                My Task
              </Link>
            </li>
          )}

          {user ? (
            <Dropdown
              menu={{
                items,
              }}
              placement="bottom"
              arrow
            >
              <div className="userInfoNav">
                <img src={avatar} alt="." />
                <span>
                  {user?.firstName
                    ? `Hello, ${user?.firstName} ${user?.lastName}`
                    : user?.username}
                </span>
              </div>
            </Dropdown>
          ) : (
            <>
              <li>
                <Link to="/login" className={active === "login" && "activeNav"}>
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className={active === "register" && "activeNav"}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
