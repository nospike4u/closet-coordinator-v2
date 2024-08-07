import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import SidebarButton from "../components/SidebarButton";
import SidebarMenu from "../components/SidebarMenu";
import { AiFillEdit, AiFillDelete } from "react-icons/ai"; // Import react-icons
import ControlPanel from "../components/ControlPanel"; // Import ControlPanel
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useAuthContext } from "../contexts/authContext";

const ClothesList = () => {
  const { url } = useAuthContext();
  const [clothes, setClothes] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null); // State for the item being edited
  const [isEditing, setIsEditing] = useState(false); // State for showing ControlPanel

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/api/v1/clothes`);
        if (response.data && response.data.data) {
          setClothes(response.data.data);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const category = query.get("category");
    if (category) {
      setFilter(category);
    }
  }, [location.search]);

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);
  const handleFilterChange = (category) => {
    setFilter(category);
    setIsMenuOpen(false);
    window.scrollTo(0, 0); // Scroll to top when filter is changed
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setIsEditing(true);
  };

  const handleDeleteClick = async (itemId) => {
    try {
      await axios.delete(`${url}/api/v1/clothes/${itemId}`);
      setClothes(clothes.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleCloseEditPanel = () => {
    setIsEditing(false);
    setSelectedItem(null);
  };

  // Filter clothes based on selected filter
  const filteredClothes = clothes.filter(
    (item) => filter === "All" || item.category === filter
  );


  return (
    <div>
      <Navbar className="navbar sticky top-0" />
      <div className="relative">
        <SidebarButton onClick={handleMenuToggle} />
        <SidebarMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onFilterChange={handleFilterChange}
        />
        <div className="p-2 max-w-screen-sm mx-auto">
          {isEditing && selectedItem && (
            <div className="fixed inset-0 flex items-center justify-center z-40">
              <ControlPanel
                isEditMode={true}
                initialData={selectedItem}
                onClose={handleCloseEditPanel}
                clearImage={() => {}}
                onFeedback={() => {}}
              />
            </div>
          )}
          <div className="grid grid-cols-3 gap-4">
            {filteredClothes.map((item) => (
              <motion.div
                key={item._id}
                className="relative bg-base-100 shadow-xl rounded-md border-4 border-white overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <figure>
                  <img
                    src={item.img}
                    alt={item.type || "Clothing Item"}
                    className="w-full h-40 object-cover"
                  />
                </figure>
                <div className="absolute top-0 right-0 p-2 space-x-2 flex">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
                  >
                    <AiFillEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(item._id)}
                    className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                  >
                    <AiFillDelete size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <Footer className="sticky bottom-0" />
      </div>
    </div>
  );
};

export default ClothesList;
