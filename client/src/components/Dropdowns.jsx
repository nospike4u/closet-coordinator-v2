import React from "react";

const Dropdowns = ({
  dropdown1,
  setDropdown1,
  dropdown2,
  setDropdown2,
  dropdown3,
  setDropdown3,
  // dropdown4,
  // setDropdown4,
  // dropdown5,
  // setDropdown5,
}) => (
  <div>
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Category:
        <select
          value={dropdown1}
          onChange={(e) => setDropdown1(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500">
          <option value="">Select</option>
          <option value="Shirts">Shirt</option>
          <option value="Sweatshirts">Sweatshirt</option>
          <option value="Trousers">Trousers</option>
          <option value="Jackets">Jacket</option>
          <option value="Shoes">Shoes</option>
          <option value="Accessories">Accessory</option>
        </select>
      </label>
    </div>

    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Type:
        <select
          value={dropdown2}
          onChange={(e) => setDropdown2(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500">
          <option value="">Select</option>
          <option value="Vest">Vest</option>
          <option value="Short Sleeves">Short Sleeves</option>
          <option value="Long Sleeves">Long Sleeves</option>
          <option value="Blouse">Blouse</option>
        </select>
      </label>
    </div>

    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Main Colour:
        <select
          value={dropdown3}
          onChange={(e) => setDropdown3(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500">
          <option value="">Select</option>
          <option value="Red">Red</option>
          <option value="Blue">Blue</option>
          <option value="Green">Green</option>
          <option value="White">White</option>
        </select>
      </label>
    </div>

    {/* <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Season:
        <select
          value={dropdown4}
          onChange={(e) => setDropdown4(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500">
          <option value="">Select</option>
          <option value="Summer">Summer</option>
          <option value="Autumn">Autumn</option>
          <option value="Winter">Winter</option>
          <option value="Spring">Spring</option>
        </select>
      </label>
    </div> */}

    {/* <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Occasion:
        <select
          value={dropdown5}
          onChange={(e) => setDropdown5(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500">
          <option value="">Select</option>
          <option value="Sports">Sports</option>
          <option value="Holiday">Holiday</option>
          <option value="Formal">Formal</option>
          <option value="Informal">Informal</option>
        </select>
      </label>
    </div> */}
  </div>
);

export default Dropdowns;
