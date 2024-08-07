import React from "react";

const Sliders = ({ slider1, setSlider1 }) => (
  <div className="mb-4">
    <div className="mb-2">
      <label className="text-lg font-semibold text-blue-600 mb-2">
        Energy Level:
        <div className="flex items-center justify-between">
          <span className="text-gray-700 text-sm pr-2">Zombie mode</span>
          <input
            type="range"
            min="1"
            max="5"
            value={slider1}
            onChange={(e) => setSlider1(Number(e.target.value))}
            className="mt-1 w-full"
          />
          <span className="text-gray-700 text-sm pl-2">
            Release the Kracken!
          </span>
        </div>
      </label>
    </div>

    {/* <div className="mb-2">
      <label className="text-lg font-semibold text-blue-600 mb-2">
        Mood Level:
        <div className="flex items-center justify-between">
          <span className="text-gray-700 text-sm pr-2">Disney Princess</span>
          <input
            type="range"
            min="1"
            max="5"
            value={slider2}
            onChange={(e) => setSlider2(Number(e.target.value))}
            className="mt-1 w-full"
          />
          <span className="text-gray-700 text-sm pl-2">
            I call upon our Dark Lord Cthulhu
          </span>
        </div>
      </label>
    </div> */}
  </div>
);

export default Sliders;
