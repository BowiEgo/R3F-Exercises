import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { Float, SoftShadows } from '@react-three/drei';
import Lights from './Lights';
import { useControls } from 'leva';
import './style.css';
import HexagonGeometry from './HexagonGeometry';
import RingGeometry from './RingGeometry';

export default function Geometries() {
	const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
	const cubeGeometry = new THREE.BoxGeometry();

	const {
		bgColor,
		blueColor,
		darkBlueColor,
		purpleColor,
		redColor,
		yellowColor,
		greyColor,
	} = useControls('Colors', {
		bgColor: '#d863ad',
		blueColor: '#0086ce',
		darkBlueColor: '#006fcb',
		purpleColor: '#8642cb',
		redColor: '#ff4242',
		yellowColor: '#b4871d',
		greyColor: '#9d9d9d',
	});

	// const { rotation, position } = useControls({
	// 	rotation: [-0.59, 0, 0],
	// 	position: [3.3, -1, -1.3],
	// });

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
		{ color: redColor, position: [1.4, -0.6, 1.5], scale: 0.33 },
		{ color: redColor, position: [-0.5, -0.2, 1.5], scale: 0.33 },
		{ color: yellowColor, position: [4, 1.2, 0], scale: 0.4 },
		{ color: yellowColor, position: [5.2, 2, -0.2], scale: 0.4 },
		{ color: yellowColor, position: [3.6, 2, -2.4], scale: 0.4 },
		{ color: yellowColor, position: [-1, 1.2, 1.5], scale: 0.36 },
		{ color: yellowColor, position: [3.3, -1.6, 1.5], scale: 0.12 },
		{ color: purpleColor, position: [2.5, -2.2, -3], scale: 1 },
	];

	const cubeShuffle = [
		{
			color: purpleColor,
			position: [2.1, -0.78, 2.5],
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
			ringArgs: [0.5, 0.3, 0.1],
		},
		{
			color: purpleColor,
			position: [-3, 1.5, 1],
			rotation: [1, 0, 0.3],
			scale: 1,
			ringArgs: [0.5, 0.3, 0.1],
		},
		{
			color: darkBlueColor,
			position: [0, -2, 1],
			rotation: [1, 3, 0.3],
			scale: 1,
			ringArgs: [0.35, 0.28, 0.2],
		},
		{
			color: darkBlueColor,
			position: [4.2, 0, 1],
			rotation: [1, 2, 0.3],
			scale: 1,
			ringArgs: [0.35, 0.28, 0.2],
		},
		{
			color: darkBlueColor,
			position: [3.6, 1, -1],
			rotation: [-0.7, 0, 2],
			scale: 1,
			ringArgs: [0.12, 0.06, 4.5],
		},
		{
			color: yellowColor,
			position: [5.2, 0.2, -1],
			rotation: [-2.9, -0.6, 2],
			scale: 1,
			ringArgs: [0.12, 0.06, 3],
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

				{/* <OrbitControls makeDefault /> */}

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
								roughness={0.9}
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
							<RingGeometry args={item.ringArgs} />
							<meshStandardMaterial
								color={item.color}
								roughness={1}
								metalness={0.8}
							/>
						</mesh>
					))}

					<mesh
						castShadow
						receiveShadow
						rotation={[-0.59, 0, 0.04]}
						position={[2.9, -1.0, -1.3]}
						scale={1.3}
					>
						<HexagonGeometry args={[1, 0.2]} />
						<meshStandardMaterial
							color={yellowColor}
							roughness={0.7}
							metalness={0.7}
						/>
					</mesh>
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
