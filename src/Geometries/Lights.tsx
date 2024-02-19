import * as THREE from 'three';
import { useRef } from 'react';
import { Environment, Lightformer } from '@react-three/drei';
import { useControls } from 'leva';

export default function Lights() {
	const directionalLight = useRef<THREE.DirectionalLight>(null!!);

	// useHelper(directionalLight, THREE.DirectionalLightHelper, 1, '#fff');

	const { position } = useControls('Light', {
		position: [5, 1.56, 5.94],
	});

	return (
		<>
			<ambientLight intensity={0.5} />
			<directionalLight
				intensity={2}
				position={[-1.3, 1.56, 5.94]}
				castShadow
			/>

			<directionalLight
				ref={directionalLight}
				intensity={2}
				position={position}
				castShadow
			/>

			<Environment files='assets/HDRIs/aerodynamics_workshop_1k.hdr'>
				{/* left-down-back */}
				<Lightformer
					position={[-10, -10, -10]}
					scale={10}
					color='#ffffff'
					intensity={3}
					form='ring'
				/>

				{/* left-up-front */}
				<Lightformer
					position={[-10, 10, 10]}
					scale={3}
					color='#ffffff'
					intensity={50}
					form='ring'
				/>
				<Lightformer
					position={[0, -10, 10]}
					scale={100}
					color='#ffffff'
					intensity={10}
					form='ring'
				/>
			</Environment>
		</>
	);
}
