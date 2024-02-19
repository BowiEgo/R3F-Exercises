import * as THREE from 'three';

const HexagonGeometry = ({ args = [2, 4] }) => {
	const [r, h] = args;
	const angle = Math.PI / 3;
	const x = r * Math.sin(angle),
		y = r * Math.cos(angle);

	const shape = new THREE.Shape();
	shape.moveTo(0, r);
	shape.lineTo(x, y);
	shape.lineTo(x, -y);
	shape.moveTo(0, -r);
	shape.lineTo(-x, -y);
	shape.lineTo(-x, y);
	shape.lineTo(0, r);

	const extrudeSettings = {
		steps: 1,
		depth: h,
		bevelEnabled: false,
	};

	return <extrudeGeometry args={[shape, extrudeSettings]} />;
};

declare global {
	namespace JSX {
		interface HexagonGeometry extends THREE.LatheGeometry {}
	}
}

export default HexagonGeometry;
