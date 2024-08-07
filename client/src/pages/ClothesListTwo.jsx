import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ClothesListTwo.css";
import { useAuthContext } from "../contexts/authContext";

// Helper function to fetch images by category
const fetchImagesByCategory = async (url, category) => {
  try {
    const response = await fetch(`${url}/api/v1/clothes/category/${category}`);
    if (!response.ok) {
      throw new Error(`Network response was not ok for category ${category}`);
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};

const ClothesListTwo = () => {
  const { url } = useAuthContext();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category") || "Shirts"; // Default to "Shirts"

  const [categoryItems, setCategoryItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const items = await fetchImagesByCategory(url, selectedCategory);
      setCategoryItems(items);
    };

    fetchData();
  }, [selectedCategory]);

  return (
    <div className="flex flex-col h-screen px-4 py-4">
      <div className="flex flex-col flex-grow">
        <div className="sticky top-24 z-10 ">
          <div className="carousel flex space-x-4 flex-rows-2 justify-center bg-white py-4 -mt-8 my-6">
            {[
              "Accessories",
              "Shirts",
              "Jackets",
              "Trousers",
              "Sweatshirts",
              "Shoes",
            ].map((category) => (
              <div
                key={category}
                className="carousel-item w-30 h-12 flex items-center justify-center"
              >
                <button
                  key={category}
                  className={`btn ${
                    selectedCategory === category
                      ? "bg-teal-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  } carousel-item w-30 h-12 flex flex-row text-lg rounded-3xl border-2 border-white`}
                  onClick={() =>
                    (window.location.href = `/clothes-list?category=${encodeURIComponent(
                      category
                    )}`)
                  }
                >
                  {category}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center mt-4">
        {categoryItems.length > 0 && (
          <>
            <img
              src={
                categoryItems[0]?.img ||
                "https://via.placeholder.com/300?text=No+Image"
              }
              alt={selectedCategory}
              className="w-60 h-60 object-cover mb-4 border-4 border-white rounded-3xl"
            />
            <div className="grid grid-cols-2 gap-4 mb-[150px]">
              {categoryItems.map((item, index) => (
                <div
                  key={index}
                  className="relative w-48 h-48 bg-gray-200 border-4 border-white rounded-3xl overflow-hidden shadow-2xl"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover overflow-hidden"
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/300?text=No+Image")
                    }
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ClothesListTwo;
