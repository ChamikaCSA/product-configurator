import { useStore, data as d, singerData, singerThreeData } from "../store";
import { MaterialComponents } from "../components/MaterialComponents";
import { ColorComponent } from "../components/ColorComponent";
import { useState, useEffect } from "react";
import icon from "../assets/icon.png";
import arrow from "../assets/arrow.png";
import { Listbox, Transition } from "@headlessui/react";
import { ARButton } from "../components/ARButton";

const pathname = window.location.pathname;
const singer = pathname === "/triton-sofa-single-seater";
const singerThree = pathname === "/triton-sofa-three-seater";
const data = singer ? singerData : singerThree ? singerThreeData : d;
const typesLength = data.types.length;

const title = singer ? 'Triton Sofa Single Seater' : singerThree ? 'Triton Sofa Three Seater' : 'Citizen Arm Chair';
const subtitle = singer ? 'Model No: WF-TRITON-01-1S' : singerThree ? 'Model No: WF-TRITON-03-3S' : 'Konstantin Grcic, 2020';

function SingerDescription(props) {
  return (
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        props.showDescription
          ? 'max-h-80 opacity-100'
          : 'max-h-0 opacity-0 md:max-h-80 md:opacity-100'
      }`}
    >
      <div className="grid grid-cols-3 gap-y-2 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
        <div><p className="leading-tight font-popp text-xs font-medium text-blue-700">Upholstery</p></div>
        <div className="col-span-2"><p className="leading-tight font-popp text-xs font-light">Fabric</p></div>
        <div><p className="leading-tight font-popp text-xs font-medium text-blue-700">Material</p></div>
        <div className="col-span-2"><p className="leading-tight font-popp text-xs font-light">{`Treated Rubber & Engineered Wood, PU Cushion, Polyfiber, Fabric`}</p></div>
        <div><p className="leading-tight font-popp text-xs font-medium text-blue-700">Sofa Frame</p></div>
        <div className="col-span-2"><p className="leading-tight font-popp text-xs font-light">{`Treated Rubber & Engineered Wood`}</p></div>
      </div>
    </div>
  );
}

function SingerThreeDescription(props) {
  return (
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        props.showDescription
          ? 'max-h-80 opacity-100'
          : 'max-h-0 opacity-0 md:max-h-80 md:opacity-100'
      }`}
    >
      <div className="grid grid-cols-3 gap-y-2 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
        <div><p className="leading-tight font-popp text-xs font-medium text-blue-700">Upholstery</p></div>
        <div className="col-span-2"><p className="leading-tight font-popp text-xs font-light">Fabric</p></div>
        <div><p className="leading-tight font-popp text-xs font-medium text-blue-700">Material</p></div>
        <div className="col-span-2"><p className="leading-tight font-popp text-xs font-light">{`Treated Rubber & Engineered Wood, PU Cushion, Polyfiber, Fabric`}</p></div>
        <div><p className="leading-tight font-popp text-xs font-medium text-blue-700">Sofa Frame</p></div>
        <div className="col-span-2"><p className="leading-tight font-popp text-xs font-light">{`Treated Rubber & Engineered Wood`}</p></div>
      </div>
    </div>
  );
}

const Menu = ({ device, setShowQRCode }) => {
  const selectedObject = useStore((state) => state.selectedObject);

  const setSelectedObjectType = useStore(
    (state) => state.setSelectedObjectType
  );

  const selectedMaterial0 = useStore(
    (state) => state.selectedObject.selectedMaterialId0
  );
  const setSelectedMaterial0 = useStore((state) => state.setSelectedMaterial0);

  const selectedMaterial1 = useStore(
    (state) => state.selectedObject.selectedMaterialId1
  );

  const setSelectedMaterial1 = useStore((state) => state.setSelectedMaterial1);

  const selectedColor0 = useStore(
    (state) => state.selectedObject.selectedColorId0
  );

  const setSelectedColor0 = useStore((state) => state.setSelectedColor0);

  const selectedColor1 = useStore(
    (state) => state.selectedObject.selectedColorId1
  );

  const setSelectedColor1 = useStore((state) => state.setSelectedColor1);

  const [selectedChair, setSelectedChair] = useState(data.types[selectedObject.typeId]);

  useEffect(() => {
    setSelectedObjectType(selectedChair.id);
  }, [setSelectedObjectType, selectedChair]);

  const [showDescription, setShowDescription] = useState(false);

  const toggleButtonHandler = () => {
    setShowDescription(!showDescription);
  };

  const descriptionChangeHandler = () => {
    if (singer) return <SingerDescription showDescription={showDescription} />;
    if (singerThree) return <SingerThreeDescription showDescription={showDescription} />;

    return (
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          showDescription
            ? 'max-h-96 opacity-100'
            : 'max-h-0 opacity-0 md:max-h-96 md:opacity-100'
        }`}
      >
        <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
          <p className="leading-tight font-popp text-xs font-light text-gray-700">
            The Citizen armchair combines an unconventional design with a new
            way of sitting: the seat is suspended on three cables, enabling a
            pleasant swinging movement and a unique dynamic experience for the
            sitter.
          </p>
        </div>
      </div>
    );
  }

  const chairtype = data.types[selectedObject.typeId];

  const optionCategories = chairtype.meshes.map((mesh, index_mesh) => {
    const display_name = chairtype.displayNames[index_mesh];

    const materialBtns = chairtype.materialTypes[index_mesh].map((item) => {
      const material = data.materialTypes.find(
        (element) => element.id === item
      );
      return { id: material.id, name: material.name };
    });

    const materialBtnsLength = materialBtns.length;

    let colorBtns = [];

    if (index_mesh === 0) {
      colorBtns = data.materialTypes[selectedMaterial0].clrbtn;
    } else {
      colorBtns = data.materialTypes[selectedMaterial1].clrbtn;
    }

    return (
      <div
        className={`mt-3 bg-white rounded-lg p-3 shadow-sm animate-fadeIn`}
        style={{animationDelay: `${index_mesh * 100}ms`}}
        key={index_mesh}
      >
        <div className="border-l-4 border-blue-500 pl-2">
          <p className="font-popp text-xs font-medium leading-tight">
            {display_name}
          </p>
        </div>
        <div className={`${materialBtnsLength <= 1 ? 'hidden' : ''}`}>
          {index_mesh === 0 && (
            <MaterialComponents
              variety={materialBtns}
              activeitem={selectedMaterial0}
              setactive={setSelectedMaterial0}
            />
          )}
          {index_mesh === 1 && (
            <MaterialComponents
              variety={materialBtns}
              activeitem={selectedMaterial1}
              setactive={setSelectedMaterial1}
            />
          )}
        </div>
        <div>
          {index_mesh === 0 && (
            <ColorComponent
              variety={colorBtns}
              activeitem={selectedColor0}
              setactive={setSelectedColor0}
            />
          )}
          {index_mesh === 1 && (
            <ColorComponent
              variety={colorBtns}
              activeitem={selectedColor1}
              setactive={setSelectedColor1}
            />
          )}
        </div>
      </div>
    );
  });

  const GotoStore = () => {
    window.open(
      "https://www.designboom.com/design/vitra-citizen-armchair-konstantin-grcic-04-29-2020/",
      "_blank"
    );
  };

  return (
    <div
      className="bg-white rounded-xl shadow-lg h-full flex flex-col animate-slideUp"
    >
      <div className="px-4 pt-3 pb-1 sticky top-0 bg-white z-10">
        <div className="flex justify-between items-center">
          <h1
            className="leading-7 font-popp text-lg font-bold md:text-2xl md:font-semibold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent animate-slideInRight"
          >
            {title}
          </h1>
          <div
            className="w-7 h-7 bg-blue-50 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-100 transition-all duration-200 md:hidden hover:scale-110 active:scale-95"
            onClick={toggleButtonHandler}
          >
            <img
              className={`w-3 h-3 transition-transform duration-300 ${showDescription ? 'rotate-180' : ''}`}
              src={icon}
              alt="toggle"
            />
          </div>
        </div>
        <p className="leading-tight font-popp text-xs font-light md:text-sm md:font-light text-gray-600">
          {subtitle}
        </p>
        <div className="mt-2 mb-2">
          {descriptionChangeHandler()}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div
          className={`px-4 border-t border-gray-200 md:border-none pt-2 transition ease-in-out duration-200`}
        >
          <div className={` ${typesLength <= 1 ? 'hidden' : 'mt-1 w-full'}`}>
            <Listbox
              as="div"
              className="relative"
              value={selectedChair}
              onChange={setSelectedChair}
            >
              {({ open }) => (
                <>
                  <Listbox.Button className="w-full h-12 flex items-center justify-between rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg overflow-hidden mx-2 bg-gray-100 flex items-center justify-center">
                        <img
                          className="w-8 h-8 transition-transform duration-200 hover:scale-110"
                          src={selectedChair.img}
                          alt={selectedChair.name}
                        />
                      </div>
                      <span className="font-medium text-sm">{selectedChair.name}</span>
                    </div>
                    <span
                      className={`pointer-events-none mr-5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                    >
                      <img className="w-3 h-2" src={arrow} alt="arrow" />
                    </span>
                  </Listbox.Button>
                  <Transition
                    show={open}
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Listbox.Options className="absolute w-full mt-1 bg-white rounded-lg shadow-lg max-h-48 overflow-auto z-10 focus:outline-none py-1">
                      {data.types.map((person) => (
                        <Listbox.Option
                          className={({ active }) =>
                            `flex items-center cursor-pointer py-1 px-3 ${
                              active ? 'bg-blue-50 text-blue-700' : 'text-gray-900'
                            }`
                          }
                          key={person.id}
                          value={person}
                        >
                          {({ selected }) => (
                            <>
                              <div className="w-10 h-10 rounded-lg overflow-hidden mr-3 bg-gray-100 flex items-center justify-center">
                                <img
                                  className="w-8 h-8"
                                  src={person.img}
                                  alt={person.name}
                                />
                              </div>
                              <span className={`text-sm ${selected ? 'font-medium' : 'font-normal'}`}>
                                {person.name}
                              </span>
                              {selected && (
                                <span className="absolute right-4 text-blue-600">
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="currentColor" />
                                  </svg>
                                </span>
                              )}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </>
              )}
            </Listbox>
          </div>
        </div>
        <div className="px-4 space-y-2 pb-4">
          {optionCategories}
        </div>
      </div>

      {(singer || singerThree) && (
        <div className="border-t border-gray-100 bg-white mt-auto">
          <ARButton device={device} color={selectedColor0} setShowQRCode={setShowQRCode} />
        </div>
      )}
    </div>
  );
};

export { Menu };