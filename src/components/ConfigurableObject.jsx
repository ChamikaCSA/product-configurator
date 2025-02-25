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
    const selectedType = data.types[selectedObject?.typeId || 0];

    const meshes = selectedType.meshes.map((meshId, index) => {
        const materialId = index === 0 ? selectedObject?.selectedMaterialId0 : selectedObject?.selectedMaterialId1;
        const material = materialId !== undefined ? data.materialTypes[materialId] : null;
        const colorId = index === 0 ? selectedObject?.selectedColorId0 : selectedObject?.selectedColorId1;
        const color = material?.colors?.[colorId];

        if (!material || !color) return null;

        const meshObject = props.nodes[meshId];
        if (meshObject && props.materials[color]) {
            meshObject.material = props.materials[color];
        }

        return <primitive key={`mesh_${meshId}`} object={meshObject} dispose={null} />;
    }).filter(Boolean);

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