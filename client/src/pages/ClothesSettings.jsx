import { useState } from 'react';

const ClothesSettings = () => {
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [clothingCategory, setClothingCategory] = useState('');
  const [occasion, setOccasion] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryChange = (event) => {
    setClothingCategory(event.target.value);
  };

  const handleOccasionChange = (event) => {
    setOccasion(event.target.value);
  };

  const isSaveEnabled = image && clothingCategory && occasion;

  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-4">
      {/* Image Upload Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Upload Image</label>
        <input 
          type="file" 
          required
          onChange={handleImageChange} 
          className="block w-full text-sm text-gray-900 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
        />
        {imagePreviewUrl && (
          <div className="mt-4">
            {/* Image Preview with constrained size */}
            <img 
              src={imagePreviewUrl} 
              alt="Preview" 
              className="object-scale-down h-48 w-96" // Tailwind classes to constrain image dimensions
            />
          </div>
        )}
      </div>

      {/* Clothes Category Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Clothes Category</label>
        <select 
          value={clothingCategory} 
          required
          onChange={handleCategoryChange}
          className="block w-full mt-1 text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select a category</option>
          <option value="shirt">Shirt</option>
          <option value="pants">Pants</option>
          <option value="jacket">Jacket</option>
          <option value="shoes">Shoes</option>
        </select>
      </div>

      {/* Occasions Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Occasions</label>
        <select 
          value={occasion} 
          required
          onChange={handleOccasionChange}
          className="block w-full mt-1 text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select an occasion</option>
          <option value="sports">Sports</option>
          <option value="holiday">Holiday</option>
          <option value="formal">Formal</option>
          <option value="informal">Informal</option>
        </select>
      </div>

      {/* Save Button */}
      <button 
        disabled={!isSaveEnabled}
        className={`mt-4 w-full text-white font-bold py-2 px-4 rounded ${isSaveEnabled ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-500 cursor-not-allowed'}`}
      >
        Save
      </button>
    </div>
  )
}

export default ClothesSettings;
