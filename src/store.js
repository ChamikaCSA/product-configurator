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
        "planobluecoconutmtl1",
        "planoclasseicgreenforestmtl",
        "planocognacmtl",
        "planoorangemtl",
      ],
      clrbtn: [
        {
          id: 0,
          name: "Blue Coconut",
          bgimg: "planobluecoconutmtl1",
        },
        {
          id: 1,
          name: "Green Forest",
          bgimg: "planoclasseicgreenforestmtl",
        },
        {
          id: 2,
          name: "Cognac",
          bgimg: "planocognacmtl",
        },
        {
          id: 3,
          name: "Orange",
          bgimg: "planoorangemtl",
        },
      ],
    },
    {
      id: 1,
      name: "Laser",
      colors: [
        "laserbluemoormtl",
        "laserlightgreymtl",
        "lasermintforestmtl",
        "laseryellowpoppyredmtl",
      ],
      clrbtn: [
        {
          id: 0,
          name: "Blue Moor",
          bgimg: "laserbluemoormtl",
        },
        {
          id: 1,
          name: "Light Grey",
          bgimg: "laserlightgreymtl",
        },
        {
          id: 2,
          name: "Mint Forest",
          bgimg: "lasermintforestmtl",
        },
        {
          id: 3,
          name: "Yellow Poppy",
          bgimg: "laseryellowpoppyredmtl",
        },
      ],
    },
    {
      id: 2,
      name: "Cosy",
      colors: [
        "cosy2canoramtl",
        "cosy2palerosemtl",
        "cosy2papyrusmtl",
        "cosy2rustyorange",
      ],
      clrbtn: [
        {
          id: 0,
          name: "Canora",
          bgimg: "cosy2canoramtl",
        },
        {
          id: 1,
          name: "Pale Rose",
          bgimg: "cosy2palerosemtl",
        },
        {
          id: 2,
          name: "Papyrus",
          bgimg: "cosy2papyrusmtl",
        },
        {
          id: 3,
          name: "Rusty Orange",
          bgimg: "cosy2rustyorange",
        },
      ],
    },
    {
      id: 3,
      name: "Credo",
      colors: [
        "credosafferonmtl",
        "credoroyalblueelephantmtl",
        "credoredchilliemtl",
        "credoemeraldcmtl",
      ],
      clrbtn: [
        {
          id: 0,
          name: "Safferon",
          bgimg: "credosafferonmtl",
        },
        {
          id: 1,
          name: "Royal Blue",
          bgimg: "credoroyalblueelephantmtl",
        },
        {
          id: 2,
          name: "Red Chilli",
          bgimg: "credoredchilliemtl",
        },
        {
          id: 3,
          name: "Emarald",
          bgimg: "credoemeraldcmtl",
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
      img: "icon/chair_citizen/LowBack.png",
      meshes: ["single_seater"],
      displayNames: ["Colors"],
      materialTypes: [[0]],
    },
  ],
  materialTypes: [
    {
      id: 0,
      name: "Plano",
      colors: ["single_seaterMtl", "fabric_1Mtl"],
      clrbtn: [
        {
          id: 0,
          name: "Gray",
          bgimg: "bg-oneseatergray",
        },
        {
          id: 1,
          name: "Gold",
          bgimg: "bg-oneseatergold",
        }
      ],
    },
  ],
};

export const singerThreeData = {
  types: [
    {
      id: 0,
      name: "Single Seater",
      img: "icon/chair_citizen/LowBack.png",
      meshes: ["single_seater"],
      displayNames: ["Colors"],
      materialTypes: [[0]],
    },
  ],
  materialTypes: [
    {
      id: 0,
      name: "Plano",
      colors: ["single_seaterMtl", "fabric_1Mtl"],
      clrbtn: [
        {
          id: 0,
          name: "Gray",
          bgimg: "bg-oneseatergray",
        },
        {
          id: 1,
          name: "Gold",
          bgimg: "bg-oneseatergold",
        }
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
  setSelectedObjectType: (id) =>
    set((state) => ({
      selectedObject: {
        typeId: id,
        selectedMaterialId0: state.selectedObject.selectedMaterialId0,
        selectedMaterialId1: state.selectedObject.selectedMaterialId1,
        selectedColorId0: state.selectedObject.selectedColorId0,
        selectedColorId1: state.selectedObject.selectedColorId1,
      },
    })),
  setSelectedMaterial0: (materialId) =>
    set((state) => ({
      selectedObject: {
        typeId: state.selectedObject.typeId,
        selectedMaterialId0: materialId,
        selectedMaterialId1: state.selectedObject.selectedMaterialId1,
        selectedColorId0: 0,
        selectedColorId1: state.selectedObject.selectedColorId1,
      },
    })),
  setSelectedMaterial1: (materialId) =>
    set((state) => ({
      selectedObject: {
        typeId: state.selectedObject.typeId,
        selectedMaterialId0: state.selectedObject.selectedMaterialId0,
        selectedMaterialId1: materialId,
        selectedColorId0: state.selectedObject.selectedColorId0,
        selectedColorId1: 0,
      },
    })),
  setSelectedColor0: (colorId) =>
    set((state) => ({
      selectedObject: {
        typeId: state.selectedObject.typeId,
        selectedMaterialId0: state.selectedObject.selectedMaterialId0,
        selectedMaterialId1: state.selectedObject.selectedMaterialId1,
        selectedColorId0: colorId,
        selectedColorId1: state.selectedObject.selectedColorId1,
      },
    })),
  setSelectedColor1: (colorId) =>
    set((state) => ({
      selectedObject: {
        typeId: state.selectedObject.typeId,
        selectedMaterialId0: state.selectedObject.selectedMaterialId0,
        selectedMaterialId1: state.selectedObject.selectedMaterialId1,
        selectedColorId0: state.selectedObject.selectedColorId0,
        selectedColorId1: colorId,
      },
    })),
  // ,
  // setSelectedObjectName: (id) => set(state => ({
  //     selectedObject: {
  //         name: id,
  //         selectedObjectCenter: state.selectedObject.selectedObjectCenter,
  //         selectedObjectSize: state.selectedObject.selectedObjectSize
  //     }
  // }))
}));

export { useStore };