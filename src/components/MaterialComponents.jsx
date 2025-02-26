import React from "react";

export const MaterialComponents = ({ variety, activeitem, setactive }) => {
  const toggleActiveStyle = (item) => {
    if (item.id === activeitem) {
      return "focus:outline-none flex-1 h-9 border-0 text-center text-xs font-medium py-1 px-2 bg-blue-600 rounded-md text-white shadow-md transition-colors duration-200";
    } else {
      return "focus:outline-none flex-1 h-9 border border-gray-200 text-center text-xs font-normal py-1 px-2 hover:bg-gray-100 rounded-md text-gray-700 transition-colors duration-200";
    }
  };

  return (
    <div className="mt-2">
      <div className="flex space-x-2 w-full">
        {variety.map((item, index) => {
          return (
            <button
              key={item.id}
              className={`${toggleActiveStyle(item)} animate-fadeIn transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]`}
              style={{animationDelay: `${index * 100}ms`}}
              onClick={() => {
                setactive(item.id);
              }}
            >
              {item.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}