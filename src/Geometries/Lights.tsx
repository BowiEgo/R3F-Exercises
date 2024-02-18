import * as THREE from 'three';
import { useRef } from 'react';
import { Environment, Lightformer } from '@react-three/drei';
import { useControls } from 'leva';

export default function Lights() {
	const directionalLight = useRef<THREE.DirectionalLight>(null!!);

	// useHelper(directionalLight, THREE.DirectionalLightHelper, 1, '#fff');

	const { position } = useControls('Light', {
		position: [-2.5, 5, 5],
	});

	return (
		<>
			<ambientLight intensity={0.5} />
			<directionalLight
				ref={directionalLight}
				intensity={3}
				position={position}
				castShadow
			/>

			<Environment files='assets/HDRIs/aerodynamics_workshop_1k.hdr'>
				<Lightformer
					position={[-10, 0, 10]}
					scale={10}
					color='#ffffff'
					intensity={4}
					form='ring'
				/>
				<Lightformer
					position={[10, -10, 10]}
					scale={10}
					color='#ffffff'
					intensity={4}
					form='ring'
				/>
				<Lightformer
					position={[-10, -10, -10]}
					scale={10}
					color='#ffffff'
					intensity={4}
					form='ring'
				/>
				<Lightformer
					position={[-10, 10, -10]}
					scale={10}
					color='#ffffff'
					intensity={4}
					form='ring'
				/>
			</Environment>
		</>
	);
}
