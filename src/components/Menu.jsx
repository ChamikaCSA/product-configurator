import { useStore, data as d, singerData, singerThreeData } from "../store";
import { MaterialComponents } from "../components/MaterialComponents";
import { ColorComponent } from "../components/ColorComponent";
import { useState, useEffect } from "react";
import icon from "../assets/icon.png";
import arrow from "../assets/arrow.png";
import { Listbox } from "@headlessui/react";
import { ARButton } from "../components/ARButton";

const pathname = window.location.pathname;
const singer = pathname === "/triton-sofa-single-seater";
const singerThree = pathname === "/triton-sofa-three-seater";
const data = singer ? singerData : singerThree ? singerThreeData : d;
const typesLength = data.types.length;

const title = singer ? 'Triton Sofa Single Seater' : singerThree ? 'Triton Sofa Three Seater' : 'Citizen Arm Chair';
const subtitle = singer ? 'Model No: WF-TRITON-01-1S' : singerThree ? 'Model No: WF-TRITON-03-3S' : 'Konstantin Grcic, 2020';

function SingerDescription(props) {
  return (<div
    className={`${props.showDescription ? "" : "hidden md:block"
      }`}
  >
    <div className="grid grid-cols-3 gap-y-2">
      <div><p className="leading-5 font-popp text-xs font-medium md:text-sm md:font-medium">Upholstery</p></div>
      <div className="col-span-2"><p className="leading-5 font-popp text-xs font-light md:text-sm md:font-light">Fabric</p></div>
      <div><p className="leading-5 font-popp text-xs font-medium md:text-sm md:font-medium">Material</p></div>
      <div className="col-span-2"><p className="leading-5 font-popp text-xs font-light md:text-sm md:font-light">{`Treated Rubber & Engineered Wood, PU Cushion, Polyfiber, Fabric`}</p></div>
      <div><p className="leading-5 font-popp text-xs font-medium md:text-sm md:font-medium">Sofa Frame</p></div>
      <div className="col-span-2"><p className="leading-5 font-popp text-xs font-light md:text-sm md:font-light">{`Treated Rubber & Engineered Wood`}</p></div>
    </div>
  </div>);
}

function SingerThreeDescription(props) {
  return (<div
    className={`${props.showDescription ? "" : "hidden md:block"
      }`}
  >
    <div className="grid grid-cols-3 gap-y-2">
      <div><p className="leading-5 font-popp text-xs font-medium md:text-sm md:font-medium">Upholstery</p></div>
      <div className="col-span-2"><p className="leading-5 font-popp text-xs font-light md:text-sm md:font-light">Fabric</p></div>
      <div><p className="leading-5 font-popp text-xs font-medium md:text-sm md:font-medium">Material</p></div>
      <div className="col-span-2"><p className="leading-5 font-popp text-xs font-light md:text-sm md:font-light">{`Treated Rubber & Engineered Wood, PU Cushion, Polyfiber, Fabric`}</p></div>
      <div><p className="leading-5 font-popp text-xs font-medium md:text-sm md:font-medium">Sofa Frame</p></div>
      <div className="col-span-2"><p className="leading-5 font-popp text-xs font-light md:text-sm md:font-light">{`Treated Rubber & Engineered Wood`}</p></div>
    </div>
  </div>);
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
    return singer ? <SingerDescription showDescription={showDescription} /> : singerThree ? <SingerThreeDescription showDescription={showDescription} /> : <p
      className={`leading-5 font-popp text-xs font-light md:text-sm md:font-light ${showDescription ? "" : "hidden md:block"
        }`}
    >
      The Citizen armchair combines an unconventional design with a new
      way of sitting: the seat is suspended on three cables, enabling a
      pleasant swinging movement and a unique dynamic experience for the
      sitter.
  </p>
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
      <div className="mt-9" key={index_mesh}>
        <div>
          <p className="font-popp text-sm font-medium leading-5 md:text-base md:font-medium">
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
    <>
      <div>
        <div className="px-6">
          <div className="pt-4 flex justify-between items-center">
            <h1 className="leading-8 font-popp text-lg font-bold md:text-3xl md:font-semibold md:leading-10">
              {title}
            </h1>
            <img
              className={`w-6 h-6 ${showDescription
                ? "transform rotate-180 duration-300"
                : "transform duration-300"
                } md:hidden`}
              src={icon}
              alt="toggle"
              onClick={toggleButtonHandler}
            />
          </div>
          <p className="leading-5 font-popp text-sm font-light md:text-lg md:font-light">
            {subtitle}
          </p>
          <div className="mt-6 mb-4">
            {descriptionChangeHandler()}
          </div>
        </div>
        <div
          className={`px-6 border-t-1 border-gray-300 md:border-none transition ease-in-out duration-200 ${showDescription ? "transform translate-y-4" : "translate-y-0"
            }`}
        >
          <div className={` ${typesLength <= 1 ? 'hidden' : 'mt-5 h-14 w-full shadow-md'}`}>
            <Listbox
              as="div"
              className="relative"
              value={selectedChair}
              onChange={setSelectedChair}
            >
              <Listbox.Button className="w-full h-14 flex items-center justify-between rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <div className="flex items-center">
                  <img
                    className="w-10 h-10 mx-4"
                    src={selectedChair.img}
                    alt={selectedChair.name}
                  />
                  <span>{selectedChair.name}</span>
                </div>
                <span className="pointer-events-none mr-5">
                  <img className="w-3 h-2" src={arrow} alt="arrow" />
                </span>
              </Listbox.Button>
              <Listbox.Options className="absolute w-full top-0 bg-white focus:outline-none shadow-md cursor-pointer z-10">
                {data.types.map((person) => (
                  <Listbox.Option
                    className="flex items-center focus:outline-none pt-1 pb-3 hover:bg-gray-100"
                    key={person.id}
                    value={person}
                  >
                    <img
                      className="w-10 h-10 mx-4"
                      src={person.img}
                      alt={person.name}
                    />
                    <span>{person.name}</span>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>
        </div>
        <div className="px-6">{optionCategories}</div>
        {!(singer || singerThree) && <div className="mt-16 px-6 pb-5">
          <button
            className="focus:outline-none w-full h-12 bg-gradient-to-b from-butbluegrad1 to-butbluegrad2 rounded-md hover:opacity-95"
            onClick={GotoStore}
          >
            <div className="flex justify-center items-center">
              <div>
                <svg className="w-4 h-4 mx-1 text-white md:w-4 md:h-4 md:mx-1" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.5159 8.04941H14.1454C14.5441 8.04941 14.8573 7.74691 14.8573 7.38213C14.8573 7.00845 14.5441 6.71484 14.1454 6.71484H11.5159C11.1172 6.71484 10.804 7.00845 10.804 7.38213C10.804 7.74691 11.1172 8.04941 11.5159 8.04941ZM17.2677 3.42411C17.8468 3.42411 18.2265 3.61095 18.6062 4.02022C18.9859 4.42949 19.0524 5.0167 18.9669 5.54963L18.0651 11.3861C17.8943 12.5081 16.8691 13.3346 15.6635 13.3346H5.30707C4.04455 13.3346 3.00037 12.428 2.89595 11.2536L2.02263 1.55483L0.589246 1.3235C0.209542 1.26122 -0.0562511 0.914234 0.0101971 0.55835C0.0766453 0.194458 0.446857 -0.0466541 0.836054 0.00761832L3.10004 0.327025C3.42279 0.381297 3.6601 0.629527 3.68858 0.932029L3.86894 2.92498C3.89742 3.21058 4.14423 3.42411 4.44799 3.42411H17.2677ZM5.1561 14.7402C4.35872 14.7402 3.71322 15.3452 3.71322 16.0926C3.71322 16.8311 4.35872 17.4361 5.1561 17.4361C5.94398 17.4361 6.58948 16.8311 6.58948 16.0926C6.58948 15.3452 5.94398 14.7402 5.1561 14.7402ZM15.8333 14.7402C15.0359 14.7402 14.3904 15.3452 14.3904 16.0926C14.3904 16.8311 15.0359 17.4361 15.8333 17.4361C16.6212 17.4361 17.2667 16.8311 17.2667 16.0926C17.2667 15.3452 16.6212 14.7402 15.8333 14.7402Z" fill="white" />
                </svg>
              </div>
              <div className="text-white text-center text-base md:text-xl">Purchase</div>
            </div>
          </button>
        </div>}
        {(singer || singerThree) && <ARButton device={device} color={selectedColor0} setShowQRCode={setShowQRCode} />}
      </div>
    </>
  );
};

export { Menu };