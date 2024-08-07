import React, { useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    imageUrl: 'https://via.placeholder.com/150', // Initial placeholder image
  });

  const handleDeleteAccount = () => {
    // Handle account deletion logic here
    console.log('Account deleted');
    alert('Your account has been deleted.');
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prevUser) => ({
          ...prevUser,
          imageUrl: reader.result, // Update image URL with the uploaded file
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-center">
        <img
          src={user.imageUrl}
          alt="Profile"
          className="w-32 h-32 rounded-full shadow-lg"
        />
        <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
        <label className="mt-4 cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>
      <button
      disabled
        onClick={handleDeleteAccount}
        className="mt-6 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 cursor-not-allowed"
      >
        Delete Account
      </button>
    </div>
  );
};

export default Profile;
