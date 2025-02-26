import { useStore, data as d, singerData, singerThreeData } from "../store";
import alpha from '../assets/alpha.jpg';
import singeralpha from '../assets/singerAlpha.jpg';
import threeSeaterAlpha from '../assets/threeSeaterAlpha.jpg';
import { useTexture } from "@react-three/drei";

const pathname = window.location.pathname;
const singer = pathname === "/triton-sofa-single-seater";
const singerThree = pathname === "/triton-sofa-three-seater";
const data = singer ? singerData : singerThree ? singerThreeData : d;
const alphaPath = singer ? singeralpha : singerThree ? threeSeaterAlpha : alpha;
const nodeName = singer ? "single_seater" : singerThree ? "single_seater" : "citizen_base";

const ConfigurableObject = (props) => {
    const alphaMap = useTexture(alphaPath);

    const selectedObject = useStore(state => state.selectedObject);
    const selectedType = data.types[selectedObject.typeId];

    const meshes = selectedType.meshes.map((meshId, index) => {

        const material = (index === 0) ? data.materialTypes[selectedObject.selectedMaterialId0] : data.materialTypes[selectedObject.selectedMaterialId1];
        const color = (index === 0) ? material.colors[selectedObject.selectedColorId0] : material.colors[selectedObject.selectedColorId1];

        return <primitive material={props.materials[color]} key={"mesh_" + meshId} object={props.nodes[meshId]} dispose={null} />
    });

    props.nodes.floor.material.transparent = true;
    props.nodes.floor.material.map = alphaMap;
    props.nodes.floor.material.alphaMap = alphaMap;

    return (
        <group>
            {meshes}
            <primitive object={props.nodes[nodeName]} dispose={null} />
            <primitive object={props.nodes.floor} position={[0, 0.001, 0]} dispose={null} />
        </group>
    );
};

export { ConfigurableObject };