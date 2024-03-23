import { Canvas } from '@react-three/fiber';
import { Scene } from './Scene';
// import { OrbitControls } from '@react-three/drei';

export default function LivingRoom() {
	return (
		<>
			<Canvas
				camera={{ position: [0, 8, 10], fov: 45 }}
				shadows
			>
				<color
					args={['#dcdfd1']}
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
