import React, { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../utils/firebase.jsx";
import axios from "axios";
import { useAuthContext } from "../contexts/authContext";

const ClothesFormPopup = ({ setMessages, messages, onClose }) => {
  const { url } = useAuthContext();
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [form, setForm] = useState({
    category: "",
    type: "",
    color: "",
    season: "",
    occasion: "",
    img: "",
    energyLevel: "",
  });

  const url = `${url}/api/v1/clothes`;

  const handleSubmit = async () => {
    if (form.img) {
      try {
        await axios.post(url, form);
        setMessages([
          ...messages,
          { type: "success", text: "Clothes added successfully!" },
        ]);
        setForm({
          category: "",
          type: "",
          color: "",
          season: "",
          occasion: "",
          img: "",
          energyLevel: "",
        });
        setImageUpload(null);
        setImageUrl("");
        onClose(); // Close the popup after successful submission
      } catch (error) {
        setMessages([
          ...messages,
          { type: "error", text: "Failed to add clothes!" },
        ]);
      }
    }
  };

  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setForm({ ...form, img: url });
        setImageUrl(url); // Update the preview URL as well
      });
    });
  };

  useEffect(() => {
    if (imageUpload) {
      uploadFile();
    }
  }, [imageUpload]);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      {imageUrl && (
        <img
          alt="Uploaded Preview"
          src={imageUrl}
          className="object-cover w-full h-48 rounded-md"
        />
      )}
      <input
        type="file"
        onChange={(event) => setImageUpload(event.target.files[0])}
        className="block w-full text-sm text-gray-900 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
      />
      <div className="space-y-4">
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Clothes Category
          </label>
          <select
            name="category"
            value={form.category}
            required
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="block w-full mt-1 text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select a category</option>
            <option value="shirt">Shirt</option>
            <option value="pants">Pants</option>
            <option value="jacket">Jacket</option>
            <option value="shoes">Shoes</option>
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <select
            value={form.type}
            required
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="block w-full mt-1 text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select a type</option>
            <option value="sports">Vest</option>
            <option value="holiday">Short Sleeves</option>
            <option value="formal">Long Sleeves</option>
            <option value="informal">Blues</option>
          </select>
        </div>

        {/* Occasion */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Occasion
          </label>
          <select
            value={form.occasion}
            name="occasion"
            required
            onChange={(e) => setForm({ ...form, occasion: e.target.value })}
            className="block w-full mt-1 text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select an occasion</option>
            <option value="sports">Sports</option>
            <option value="holiday">Holiday</option>
            <option value="formal">Formal</option>
            <option value="informal">Informal</option>
          </select>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClothesFormPopup;
