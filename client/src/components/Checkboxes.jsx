import React from "react";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const Checkboxes = ({ checkboxes, handleCheckboxChange }) => (
  <div className="mb-4">
    <h3 className="text-lg font-semibold text-blue-600 mb-2">Season</h3>
    {["summer", "autumn", "winter", "spring"].map((season, index) => (
      <label key={index} className="inline-flex items-center mr-4">
        <input
          type="checkbox"
          checked={checkboxes.seasons[index]}
          onChange={() => handleCheckboxChange("seasons", index)}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <span className="ml-2">{capitalizeFirstLetter(season)}</span>
      </label>
    ))}

    <h3 className="text-lg font-semibold text-blue-600 mt-4 mb-2">Occasion</h3>
    {["party", "business", "red carpet", "casual"].map((occasion, index) => (
      <label key={index} className="inline-flex items-center mr-4">
        <input
          type="checkbox"
          checked={checkboxes.occasion[index]}
          onChange={() => handleCheckboxChange("occasion", index)}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <span className="ml-2">{capitalizeFirstLetter(occasion)}</span>
      </label>
    ))}
  </div>
);

export default Checkboxes;
