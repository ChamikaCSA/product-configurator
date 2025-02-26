import React from "react";

export const ColorComponent = ({ variety, activeitem, setactive }) => {
  const toggleActiveStyle = (index) => {
    if (index.id === activeitem) {
      return `w-12 h-12 rounded-full focus:outline-none border-4 border-blue-500 transition-all duration-200`;
    } else {
      return `w-12 h-12 rounded-full focus:outline-none border border-gray-300 transition-all duration-200`;
    }
  };

  return (
    <div className="mt-6">
      <p className="text-sm text-gray-500 mb-3">Select color:</p>
      <div className="grid grid-cols-4 gap-3">
        {variety.map((item, index) => {
          return (
            <div
              className="flex justify-center relative animate-fadeIn"
              style={{animationDelay: `${index * 50}ms`}}
              key={item.id}
            >
              <div className="group">
                <div className="p-0 rounded-full scale-95">
                  <button
                    className={`${toggleActiveStyle(item)} transition-transform duration-200 hover:scale-110 active:scale-95`}
                    style={{ backgroundImage: `url('/src/assets/materials/${item.bgimg}.png')` }}
                    onClick={() => setactive(item.id)}
                  />
                </div>
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded pointer-events-none transition-opacity duration-200">
                  {item.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}