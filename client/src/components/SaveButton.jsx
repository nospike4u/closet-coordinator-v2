import React from "react";
const SaveButton = ({ onClick }) => {
  return (
    <button
      className="mt-4 w-full text-white font-bold py-2 px-4 rounded bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      onClick={onClick}>
      Save
    </button>
  );
};
export default SaveButton;
