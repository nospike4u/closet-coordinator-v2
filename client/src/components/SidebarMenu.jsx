import React from "react";

const SidebarMenu = ({ isOpen, onClose, onFilterChange }) => {
  return (
    <div
      className={`fixed inset-0 bg-gray-700 bg-opacity-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
      style={{ zIndex: 40 }}>
      <div
        className={`absolute top-1/2 transform -translate-y-1/2 left-0 w-64 p-4 transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } bg-sky-600 bg-opacity-30 backdrop-blur-md border border-white border-opacity-10 shadow-lg rounded-r-lg`}
        onClick={(e) => e.stopPropagation()}
        style={{ zIndex: 50 }}>
        <h2 className="text-xl mb-4 text-white">Filter by Category</h2>
        <ul className="space-y-2">
          <li>
            <button
              className="w-full text-left p-2 hover:bg-sky-600 text-white rounded"
              onClick={() => onFilterChange("All")}>
              All
            </button>
          </li>
          <li>
            <button
              className="w-full text-left p-2 hover:bg-sky-600 text-white rounded"
              onClick={() => onFilterChange("Shirts")}>
              Shirts
            </button>
          </li>
          <li>
            <button
              className="w-full text-left p-2 hover:bg-sky-600 text-white rounded"
              onClick={() => onFilterChange("Trousers")}>
              Trousers
            </button>
          </li>
          <li>
            <button
              className="w-full text-left p-2 hover:bg-sky-600 text-white rounded"
              onClick={() => onFilterChange("Shoes")}>
              Shoes
            </button>
          </li>
          <li>
            <button
              className="w-full text-left p-2 hover:bg-sky-600 text-white rounded"
              onClick={() => onFilterChange("Sweatshirts")}>
              Sweatshirts
            </button>
          </li>
          <li>
            <button
              className="w-full text-left p-2 hover:bg-sky-600 text-white rounded"
              onClick={() => onFilterChange("Jackets")}>
              Jackets
            </button>
          </li>
          <li>
            <button
              className="w-full text-left p-2 hover:bg-sky-600 text-white rounded"
              onClick={() => onFilterChange("Accessories")}>
              Accessories
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarMenu;
