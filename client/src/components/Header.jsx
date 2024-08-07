import { useState } from "react";
import { CgProfile } from "react-icons/cg";
// import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="navbar flex justify-between items-center px-[30px]">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img
            src={CgProfile}
            alt=""
            className="btn btn-ghost btn-circle h-[40px]"
          />
          <span className="closet-coordinator ml-2">Closet Coordinator</span>
        </Link>
      </div>
      {/* <div className="doc flex items-center ml-[70%]">
        <Link to="/" className="flex space-x-1 items-center"></Link>
      </div> */}
      {/* <div className="flex-none gap-2"> */}
      {/* Dropdown Container */}
      {/* <div className="dropdown dropdown-end">
          {/* Trigger Button */}
      {/* <label
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar"
            onClick={toggleDropdown}> */}
      {/* <CgProfile className="profile-icon text-3xl hover:scale-105" /> */}
      {/* </label> */}
      {/* Dropdown Menu */}
      {/* {isDropdownOpen && (
            <ul
              tabIndex={0}
              className="menu menu-m dropdown-content mt-2 p-2 shadow bg-base-100 rounded-box w-52 ">
              <li>
                <Link to="/" className="justify-between">
                  <span>Profile</span>
                </Link> */}
      {/* <span className="badge bg-green-500 ">New</span> */}
      {/* </li>

              <li>
                <Link to="/login">Logout</Link>
              </li>
            </ul>
          )} */}
      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default Header;
