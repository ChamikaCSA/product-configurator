import React from "react";

export const ColorComponent = ({ variety = [], activeitem, setactive }) => {
  if (!Array.isArray(variety)) {
    return null;
  }
  const toggleActiveStyle = (index) => {
    if (index.id === activeitem) {
      return `w-12 h-12 py-1 px-2 rounded-full focus:outline-none ${index.bgimg} border-3 border-solid border-white`;
    } else {
      return `w-12 h-12 py-1 px-2 focus:outline-none ${index.bgimg} rounded-full`;
    }
  };

  const toggledivActiveStyle = (index) => {
    if (index.id === activeitem) {
      return "block bg-blue-600 p-0.5 rounded-full";
    } else {
      return "";
    }
  };

  return (
    <div className="mt-6 grid grid-cols-4">
      {variety.map((item) => (
        <div key={item.id} className="flex-1 flex justify-start">
          <div className="has-tooltip">
            <span className="tooltip rounded shadow-lg p-1 bg-gray-300 text-black text-xs -mt-8">
              {item.name}
            </span>
            <div className={toggledivActiveStyle(item)}>
              <button
                className={toggleActiveStyle(item)}
                onClick={() => setactive(item.id)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}