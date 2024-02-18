import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls, SoftShadows } from '@react-three/drei';
import Lights from './Lights';
import { useControls } from 'leva';
import CylinderLathe from './CylinderLathe';
import './style.css';

export default function Geometries() {
	const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
	const cubeGeometry = new THREE.BoxGeometry();

	const {
		bgColor,
		blueColor,
		purpleColor,
		redColor,
		yellowColor,
		greyColor,
	} = useControls('Colors', {
		bgColor: '#d863ad',
		blueColor: '#2392cf',
		purpleColor: '#8642cb',
		redColor: '#ff5d5d',
		yellowColor: '#d6aa45',
		greyColor: '#9d9d9d',
	});

	const { enabled, ...config } = useControls({
		enabled: true,
		size: { value: 25, min: 0, max: 100 },
		focus: { value: 0, min: 0, max: 2 },
		samples: { value: 10, min: 1, max: 20, step: 1 },
	});

	const sphereShuffle = [
		{ color: blueColor, position: [3, 0, 0], scale: 1 },
		{ color: blueColor, position: [0.5, -1.2, -2], scale: 0.3 },
		{ color: blueColor, position: [3.3, -2, 1], scale: 0.3 },
		{ color: blueColor, position: [1.4, 3, -4], scale: 0.2 },
		{ color: redColor, position: [1.3, -0.6, 1.5], scale: 0.33 },
		{ color: redColor, position: [-0.5, -0.2, 1.5], scale: 0.33 },
		{ color: yellowColor, position: [4, 1.2, 0], scale: 0.4 },
		{ color: yellowColor, position: [5.2, 2, -0.2], scale: 0.4 },
		{ color: yellowColor, position: [3.6, 2, -2.4], scale: 0.4 },
		{ color: yellowColor, position: [-1, 1.2, 1.5], scale: 0.36 },
	];

	const cubeShuffle = [
		{
			color: purpleColor,
			position: [2, -0.78, 2.5],
			rotation: [0.9, 0.5, 1.2],
			scale: 0.5,
		},
		{
			color: purpleColor,
			position: [-2.6, 0.28, 1],
			rotation: [0.9, 0.5, 1.2],
			scale: 0.5,
		},
		{
			color: greyColor,
			position: [0, 0.6, 2],
			rotation: [0.8, -0.65, 0.44],
			scale: 0.5,
		},
	];

	const ringShuffle = [
		{
			color: purpleColor,
			position: [2.3, 1, 1],
			rotation: [1, 0, 0.3],
			scale: 1,
		},
		{
			color: purpleColor,
			position: [-3, 1.5, 1],
			rotation: [1, 0, 0.3],
			scale: 1,
		},
		{
			color: blueColor,
			position: [0, -2, 1],
			rotation: [1, 3, 0.3],
			scale: 1,
		},
	];

	return (
		<>
			<Canvas
				camera={{ position: [0, 0, 10], fov: 45 }}
				shadows
			>
				<color
					args={[bgColor]}
					attach='background'
				/>

				<OrbitControls makeDefault />

				<Lights />
				{enabled && <SoftShadows {...config} />}

				<Float>
					{sphereShuffle.map((item, i) => (
						<mesh
							key={i}
							castShadow
							receiveShadow
							geometry={sphereGeometry}
							position={item.position as unknown as THREE.Vector3}
							scale={item.scale}
						>
							<meshStandardMaterial
								color={item.color}
								roughness={0.8}
								metalness={0.8}
							/>
						</mesh>
					))}

					{cubeShuffle.map((item, i) => (
						<mesh
							key={i}
							castShadow
							receiveShadow
							geometry={cubeGeometry}
							rotation={item.rotation as unknown as THREE.Euler}
							position={item.position as unknown as THREE.Vector3}
							scale={item.scale}
						>
							<meshStandardMaterial
								color={item.color}
								roughness={0.8}
								metalness={0.8}
							/>
						</mesh>
					))}

					{ringShuffle.map((item, i) => (
						<mesh
							castShadow
							receiveShadow
							key={i}
							rotation={item.rotation as unknown as THREE.Euler}
							position={item.position as unknown as THREE.Vector3}
						>
							<CylinderLathe args={[0.5, 0.3, 0.1]} />
							<meshStandardMaterial color={purpleColor} />
						</mesh>
					))}
				</Float>

				<mesh
					position={[12.3, 6, -10]}
					scale={1.4}
				>
					<circleGeometry args={[8, 128]} />
					<meshBasicMaterial color='#FFFFFF' />
				</mesh>
			</Canvas>

			<div className='text'>
				<h1>
					Think <strong>Creative</strong>
				</h1>
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit.
					Ipsa et cupiditate dolor ab aspernatur dignissimos commodi
					minus, accusantium error? Laboriosam facilis nam tempore
					dolore voluptates quae expedita quos alias quo!
				</p>
			</div>
		</>
	);
}
