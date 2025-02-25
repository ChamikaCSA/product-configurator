import { useStore, data as d, singerData, singerThreeData } from "../store";
import { MaterialComponents } from "./MaterialComponents";
import { ColorComponent } from "./ColorComponent";
import { useState, useEffect } from "react";
import arrow from "../assets/arrow.png";
import { Listbox } from "@headlessui/react";
import { ARButton } from "./ARButton";

const pathname = window.location.pathname;
const singer = pathname === "/triton-sofa-single-seater";
const singerThree = pathname === "/triton-sofa-three-seater";
const data = singer ? singerData : singerThree ? singerThreeData : d;
const typesLength = data.types.length;

const title = singer ? 'Triton Sofa Single Seater' : singerThree ? 'Triton Sofa Three Seater' : 'Citizen Arm Chair';
const subtitle = singer ? 'Model No: WF-TRITON-01-1S' : singerThree ? 'Model No: WF-TRITON-03-3S' : 'Konstantin Grcic, 2020';

function DescriptionGrid({ label, value }) {
  return (
    <>
      <div><p className="leading-5 font-popp text-xs font-medium md:text-sm text-gray-700">{label}</p></div>
      <div className="col-span-2"><p className="leading-5 font-popp text-xs md:text-sm text-gray-600">{value}</p></div>
    </>
  );
}

function SingerDescription({ showDescription }) {
  return (
    <div className={`${showDescription ? "" : "hidden md:block"} py-4`}>
      <div className="grid grid-cols-3 gap-y-4">
        <DescriptionGrid label="Upholstery" value="Fabric" />
        <DescriptionGrid label="Material" value="Treated Rubber & Engineered Wood, PU Cushion, Polyfiber, Fabric" />
        <DescriptionGrid label="Sofa Frame" value="Treated Rubber & Engineered Wood" />
      </div>
    </div>
  );
}

function SingerThreeDescription({ showDescription }) {
  return (
    <div className={`${showDescription ? "" : "hidden md:block"} py-4`}>
      <div className="grid grid-cols-3 gap-y-4">
        <DescriptionGrid label="Upholstery" value="Fabric" />
        <DescriptionGrid label="Material" value="Treated Rubber & Engineered Wood, PU Cushion, Polyfiber, Fabric" />
        <DescriptionGrid label="Sofa Frame" value="Treated Rubber & Engineered Wood" />
      </div>
    </div>
  );
}

const Menu = ({ device, setShowQRCode }) => {
  const [mounted, setMounted] = useState(true);
  const [showDescription, setShowDescription] = useState(false);
  const selectedObject = useStore(state => state.selectedObject);
  const setSelectedObjectType = useStore(state => state.setSelectedObjectType);
  const [selectedType, setSelectedType] = useState(data.types[selectedObject?.typeId || 0]);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (selectedType && selectedType.id !== undefined) {
      setSelectedObjectType(selectedType.id);
    }
  }, [selectedType]);

  if (!mounted) return null;

  return (
    <div className="h-full flex flex-col p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 leading-tight">{title}</h1>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>

      <div className="flex-1 space-y-8 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {typesLength > 1 && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <Listbox value={selectedType} onChange={setSelectedType}>
              <div className="relative">
                <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <span className="block truncate">{selectedType.name}</span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <img src={arrow} alt="arrow" className="w-4 h-4" />
                  </span>
                </Listbox.Button>
                <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-lg shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                  {data.types.map((type) => (
                    <Listbox.Option
                      key={type.name}
                      value={type}
                      className={({ active }) =>
                        `${active ? 'text-white bg-indigo-600' : 'text-gray-900'} cursor-pointer select-none relative py-2 pl-3 pr-9`
                      }
                    >
                      {type.name}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>
        )}

        <div className="space-y-6">
          <MaterialComponents />
          <ColorComponent />
        </div>

        <button
          onClick={() => setShowDescription(!showDescription)}
          className="w-full flex items-center justify-between py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg md:hidden"
        >
          <span>Product Details</span>
          <svg
            className={`w-5 h-5 transform transition-transform duration-200 ${showDescription ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {singer ? (
          <SingerDescription showDescription={showDescription} />
        ) : singerThree ? (
          <SingerThreeDescription showDescription={showDescription} />
        ) : null}
      </div>

      <div className="pt-4 border-t border-gray-200">
        <ARButton device={device} setShowQRCode={setShowQRCode} />
      </div>
    </div>
  );
};

export { Menu };