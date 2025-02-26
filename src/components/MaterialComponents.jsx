import React from "react";

export const MaterialComponents = ({ variety, activeitem, setactive }) => {
  const toggleActiveStyle = (index) => {
    if (index.id === activeitem) {
      return "focus:outline-none w-full h-12 md:h-10 border-solid border-1 text-center text-sm font-normal py-1 px-2 hover:bg-blue-500 hover:border-blue-500 bg-blue-600 border-blue-600 text-white md:text-base md:font-font-normal";
    } else {
      return "focus:outline-none w-full h-12 md:h-10 border-solid border-1 text-center text-sm font-normal py-1 px-2 hover:bg-gray-200 hover:border-gray-200 md:text-base md:font-normal";
    }
  };

  return (
    <div className="mt-3 flex justify-center">
      <div className="inline-flex overflow-hidden rounded-md w-full">
        {variety.map((item) => {
          return (
            <div className="flex-1" key={item.id}>
              <button
                className={toggleActiveStyle(item)}
                onClick={() => {
                  setactive(item.id);
                }}
              >
                {item.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}