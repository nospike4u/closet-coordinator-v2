import React from "react";

const TextInput = ({ textInput, setTextInput }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Name:
      <input
        type="text"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </label>
  </div>
);

export default TextInput;
