import React from "react";
import { motion } from "framer-motion";
import categories from "./categories";

const CategoryList = ({ onCategorySelect, selectedCategory }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {categories.map((category) => (
        <motion.div
          key={category.id}
          className={`relative w-32 h-32 bg-white border rounded-lg overflow-hidden shadow-md cursor-pointer transition-transform duration-300 ease-in-out
          ${
            selectedCategory?.id === category.id
              ? "border-blue-500"
              : "border-gray-300"
          }
          hover:border-blue-400 hover:bg-blue-50`} // Updated hover border and background color
          whileHover={{ scale: 1.05 }} // Slight scale effect on hover
          onClick={() => onCategorySelect(category)}>
          <img
            src={category.image}
            alt={category.name}
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="relative z-10 flex items-center justify-center h-full text-center text-lg font-bold text-gray-800">
            {category.name}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CategoryList;
