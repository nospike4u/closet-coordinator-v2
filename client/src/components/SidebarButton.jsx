import React from "react";
import { motion } from "framer-motion";
import { FaBars } from "react-icons/fa";

const SidebarButton = ({ onClick }) => {
  return (
    <div
      className="fixed left-0 top-1/2 transform -translate-y-1/2 p-2 z-30"
      onClick={onClick}>
      <motion.div
        className="bg-sky-600 text-white p-4 rounded-full shadow-lg cursor-pointer"
        style={{ opacity: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}>
        <FaBars size={24} />
      </motion.div>
    </div>
  );
};

export default SidebarButton;
