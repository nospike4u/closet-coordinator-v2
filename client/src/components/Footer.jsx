import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi";
import { LuShirt } from "react-icons/lu";
import { IoMdAddCircleOutline } from "react-icons/io";
import "./Footer.css";

const Footer = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="footer flex justify-between items-center p-2 px-4">
      <div className="btn btn-ghost btn-circle pt-2">
        <Link to="/clothes-list" className="flex items-center">
          <LuShirt className="text-white text-3xl" />
        </Link>
      </div>
      <div className="btn btn-ghost btn-circle pt-2">
        <Link to="/" className="flex items-center">
          <HiOutlineHome className="text-white text-3xl " />
        </Link>
      </div>
      <div className="btn btn-ghost btn-circle pt-2">
        <Link to="/update" className="flex items-center">
          <IoMdAddCircleOutline className="text-white text-3xl " />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
