import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

import "./Navbar.css";
import logo from "../assets/logo.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="navbar sticky top-0 bg-white shadow-md z-50 flex items-center bg-gradient-to-r from-sky-600 to-teal-400 justify-between">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt=""
            className="btn btn-ghost btn-circle h-[40px]"
          />
          <span className="closet-coordinator ml-2 text-white font-semibold line-height-2">
            Closet Coordinator
          </span>
        </Link>
      </div>
      <div className="dropdown dropdown-bottom dropdown-end">
        {/* Trigger Button */}
        <label
          tabIndex={0}
          className="btn btn-ghost btn-circle"
          onClick={toggleDropdown}
        >
          <CgProfile className="profile-icon text-3xl" />
        </label>
        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <ul
            tabIndex={0}
            className="menu menu-m dropdown-content mt-2 p-2 shadow bg-base-100 rounded-box w-24 "
          >
            <li>
              <Link to="/" className="justify-between">
                <span>Profile</span>
              </Link>
            </li>

            <li>
              <Link to="/login">Logout</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
