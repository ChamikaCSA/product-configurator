import React from "react";
import { useStore, data as d, singerData, singerThreeData } from "../store";

export const MaterialComponents = () => {
  const pathname = window.location.pathname;
  const singer = pathname === "/triton-sofa-single-seater";
  const singerThree = pathname === "/triton-sofa-three-seater";
  const data = singer ? singerData : singerThree ? singerThreeData : d;

  const { selectedObject, setSelectedMaterial0, setSelectedMaterial1 } = useStore();
  const selectedType = data.types[selectedObject?.typeId || 0];

  const toggleActiveStyle = (index, materialIndex) => {
    const selectedMaterial = materialIndex === 0 ? selectedObject?.selectedMaterialId0 : selectedObject?.selectedMaterialId1;
    if (index === selectedMaterial) {
      return "focus:outline-none w-full h-12 md:h-10 border-solid border-1 text-center text-sm font-normal py-1 px-2 hover:bg-blue-500 hover:border-blue-500 bg-blue-600 border-blue-600 text-white md:text-base md:font-font-normal";
    } else {
      return "focus:outline-none w-full h-12 md:h-10 border-solid border-1 text-center text-sm font-normal py-1 px-2 hover:bg-gray-200 hover:border-gray-200 md:text-base md:font-normal";
    }
  };

  if (!selectedType || !selectedType.materialTypes) {
    return null;
  }

  return (
    <div className="mt-3 flex flex-col gap-4">
      {selectedType.materialTypes.map((materialTypeIds, materialIndex) => (
        <div key={materialIndex} className="flex flex-col">
          <p className="text-sm font-medium mb-2">{selectedType.displayNames[materialIndex]}</p>
          <div className="inline-flex overflow-hidden rounded-md w-full">
            {materialTypeIds.map((materialTypeId) => (
              <div key={materialTypeId} className="flex-1">
                <button
                  className={toggleActiveStyle(materialTypeId, materialIndex)}
                  onClick={() => {
                    if (materialIndex === 0) {
                      setSelectedMaterial0(materialTypeId);
                    } else if (materialIndex === 1) {
                      setSelectedMaterial1(materialTypeId);
                    }
                  }}
                >
                  {data.materialTypes[materialTypeId]?.name || `Material ${materialTypeId}`}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};