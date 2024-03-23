import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Scene } from './Scene';

export default function LivingRoom() {
	return (
		<>
			<Canvas
				camera={{ position: [0, 8, 10], fov: 45 }}
				shadows
			>
				<color
					args={['rgb(190, 167, 167)']}
					attach='background'
				/>

				{/* <OrbitControls makeDefault /> */}

				{/* <ambientLight /> */}
				{/* <directionalLight castShadow /> */}

				{/* <Environment preset='sunset' /> */}

				<Scene />
			</Canvas>
		</>
	);
}
