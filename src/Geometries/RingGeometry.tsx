import * as THREE from 'three';

const RingGeometry = ({ args = [2, 1, 4] }) => {
	const [R, r, h] = args;
	let halfH = h * 0.5;

	let points = [
		new THREE.Vector2(r, -halfH),
		new THREE.Vector2(R, -halfH),
		new THREE.Vector2(R, halfH),
		new THREE.Vector2(r, halfH),
		new THREE.Vector2(r, -halfH),
	];

	return <latheGeometry args={[points, 72]} />;
};

declare global {
	namespace JSX {
		interface RingGeometry extends THREE.LatheGeometry {}
	}
}

export default RingGeometry;
