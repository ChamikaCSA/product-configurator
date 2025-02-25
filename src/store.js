import { create } from 'zustand';

export const data = {
  types: [
    {
      id: 0,
      name: "Low Back",
      img: "icon/chair_citizen/LowBack.png",
      meshes: ["citizen_Lowback"],
      displayNames: ["Seat"],
      materialTypes: [[0, 1, 2, 3]],
    },
    {
      id: 1,
      name: "High Back",
      img: "icon/chair_citizen/HighBack.png",
      meshes: ["citizen_highback", "citizen_cover"],
      displayNames: ["Seat", "Neck Cushion"],
      materialTypes: [
        [0, 1, 2, 3],
        [0, 1, 2],
      ],
    },
  ],
  materialTypes: [
    {
      id: 0,
      name: "Plano",
      colors: [
        "assets/materials/planobluecoconutmtl1.png",
        "assets/materials/planoclasseicgreenforestmtl.png",
        "assets/materials/planocognacmtl.png",
        "assets/materials/planoorangemtl.png",
      ],
      clrbtn: [
        {
          id: 0,
          name: "Blue Coconut",
          bgimg: "bg-plbluecoco",
        },
        {
          id: 1,
          name: "Green Forest",
          bgimg: "bg-plgreenforest",
        },
        {
          id: 2,
          name: "Cognac",
          bgimg: "bg-plcognac",
        },
        {
          id: 3,
          name: "Orange",
          bgimg: "bg-plorange",
        },
      ],
    },
    {
      id: 1,
      name: "Laser",
      colors: [
        "assets/materials/laserbluemoormtl.png",
        "assets/materials/laserlightgreymtl.png",
        "assets/materials/lasermintforestmtl.png",
        "assets/materials/laseryellowpoppyredmtl.png",
      ],
      clrbtn: [
        {
          id: 0,
          name: "Blue Moor",
          bgimg: "bg-labluemoor",
        },
        {
          id: 1,
          name: "Light Grey",
          bgimg: "bg-lalightgrey",
        },
        {
          id: 2,
          name: "Mint Forest",
          bgimg: "bg-lamintforest",
        },
        {
          id: 3,
          name: "Yellow Poppy",
          bgimg: "bg-layellowpoppy",
        },
      ],
    },
    {
      id: 2,
      name: "Cosy",
      colors: [
        "assets/materials/cosy2canoramtl.png",
        "assets/materials/cosy2palerosemtl.png",
        "assets/materials/cosy2papyrusmtl.png",
        "assets/materials/cosy2rustyorange.png",
      ],
      clrbtn: [
        {
          id: 0,
          name: "Canora",
          bgimg: "bg-cocanora",
        },
        {
          id: 1,
          name: "Pale Rose",
          bgimg: "bg-copalerose",
        },
        {
          id: 2,
          name: "Papyrus",
          bgimg: "bg-copapyrus",
        },
        {
          id: 3,
          name: "Rusty Orange",
          bgimg: "bg-corustyorange",
        },
      ],
    },
    {
      id: 3,
      name: "Credo",
      colors: [
        "assets/materials/credosafferonmtl.png",
        "assets/materials/credoroyalblueelephantmtl.png",
        "assets/materials/credoredchilliemtl.png",
        "assets/materials/credoemeraldcmtl.png",
      ],
      clrbtn: [
        {
          id: 0,
          name: "Safferon",
          bgimg: "bg-crsafferon",
        },
        {
          id: 1,
          name: "Royal Blue",
          bgimg: "bg-crroyalblue",
        },
        {
          id: 2,
          name: "Red Chilli",
          bgimg: "bg-crredchilli",
        },
        {
          id: 3,
          name: "Emarald",
          bgimg: "bg-cremerald",
        },
      ],
    },
  ],
};

export const singerData = {
  types: [
    {
      id: 0,
      name: "Single Seater",
      meshes: ["single_seater_cushion"],
      displayNames: ["Seat"],
      materialTypes: [[0]],
    },
  ],
  materialTypes: [
    {
      id: 0,
      name: "Fabric",
      colors: ["yellow", "gray"],
      clrbtn: [
        {
          id: 0,
          name: "Yellow",
          bgimg: "bg-yellow",
        },
        {
          id: 1,
          name: "Gray",
          bgimg: "bg-gray",
        },
      ],
    },
  ],
};

export const singerThreeData = {
  types: [
    {
      id: 0,
      name: "Three Seater",
      meshes: ["three_seater_cushion"],
      displayNames: ["Seat"],
      materialTypes: [[0]],
    },
  ],
  materialTypes: [
    {
      id: 0,
      name: "Fabric",
      colors: ["yellow", "gray"],
      clrbtn: [
        {
          id: 0,
          name: "Yellow",
          bgimg: "bg-yellow",
        },
        {
          id: 1,
          name: "Gray",
          bgimg: "bg-gray",
        },
      ],
    },
  ],
};

const useStore = create((set) => ({
  selectedObject: {
    typeId: 0,
    selectedMaterialId0: 0,
    selectedMaterialId1: 0,
    selectedColorId0: 0,
    selectedColorId1: 0,
  },
  setSelectedObjectType: (typeId) =>
    set((state) => ({
      selectedObject: {
        ...state.selectedObject,
        typeId,
      },
    })),
  setSelectedMaterial0: (materialId) =>
    set((state) => ({
      selectedObject: {
        ...state.selectedObject,
        selectedMaterialId0: materialId,
        selectedColorId0: 0,
      },
    }), true),
  setSelectedMaterial1: (materialId) =>
    set((state) => ({
      selectedObject: {
        ...state.selectedObject,
        selectedMaterialId1: materialId,
        selectedColorId1: 0,
      },
    }), true),
  setSelectedColor0: (colorId) =>
    set((state) => ({
      selectedObject: {
        ...state.selectedObject,
        selectedColorId0: colorId,
      },
    })),
  setSelectedColor1: (colorId) =>
    set((state) => ({
      selectedObject: {
        ...state.selectedObject,
        selectedColorId1: colorId,
      },
    })),
}));

export { useStore };