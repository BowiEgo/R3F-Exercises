import { Canvas } from '@react-three/fiber';
import { Scene } from './Scene';
import { OrbitControls } from '@react-three/drei';
import { useControls } from 'leva';

export default function LivingRoom() {
	const { bgColor } = useControls({
		bgColor: '#fff',
	});

	return (
		<>
			<Canvas
				camera={{ position: [-5, 4, 4], fov: 45, near: 0.01 }}
				shadows
			>
				<color
					args={[bgColor]}
					attach='background'
				/>

				<OrbitControls makeDefault />

				{/* <ambientLight /> */}
				{/* <directionalLight castShadow /> */}

				{/* <Environment preset='sunset' /> */}

				<Scene />
			</Canvas>
		</>
	);
}
