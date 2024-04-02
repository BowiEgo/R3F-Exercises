import * as THREE from 'three';
import { Merged } from '@react-three/drei';
import { ReactElement, createContext, useContext, useMemo, useRef } from 'react';
// import { data, switchData } from './store';

const context = createContext(null);

export function Switches({ nodes, color }: { nodes: any; color: THREE.Color }) {
	const gap1 = 0.295;
	const gap2 = 0.29;
	const gap3 = 0.37;

	const switchData = [
		{ position: [0, 0, 0] },
		{ position: [0.35 + gap1 * 0, 0, 0] },
		{ position: [0.35 + gap1 * 1, 0, 0] },
		{ position: [0.35 + gap1 * 2, 0, 0] },
		{ position: [0.35 + gap1 * 3, 0, 0] },
		{ position: [1.58 + gap1 * 0, 0, 0] },
		{ position: [1.58 + gap1 * 1, 0, 0] },
		{ position: [1.58 + gap1 * 2, 0, 0] },
		{ position: [1.58 + gap1 * 3, 0, 0] },
		{ position: [2.82 + gap1 * 0, 0, 0] },
		{ position: [2.82 + gap1 * 1, 0, 0] },
		{ position: [2.82 + gap1 * 2, 0, 0] },
		{ position: [2.82 + gap1 * 3, 0, 0] },
		{ position: [4.06 + gap1 * 0, 0, 0] },
		{ position: [4.43 + gap1 * 0, 0, 0] },
		{ position: [0, 0, 0.36] },
		{ position: [0.29 + gap2 * 0, 0, 0.36] },
		{ position: [0.29 + gap2 * 1, 0, 0.36] },
		{ position: [0.29 + gap2 * 2, 0, 0.36] },
		{ position: [0.29 + gap2 * 3, 0, 0.36] },
		{ position: [0.29 + gap2 * 4, 0, 0.36] },
		{ position: [0.29 + gap2 * 5, 0, 0.36] },
		{ position: [0.29 + gap2 * 6, 0, 0.36] },
		{ position: [0.29 + gap2 * 7, 0, 0.36] },
		{ position: [0.29 + gap2 * 8, 0, 0.36] },
		{ position: [0.29 + gap2 * 9, 0, 0.36] },
		{ position: [0.29 + gap2 * 10, 0, 0.36] },
		{ position: [0.29 + gap2 * 11, 0, 0.36] },
		{ position: [0.42 + gap2 * 12, 0, 0.36] },
		{ position: [0.95 + gap2 * 12, 0, 0.36] },
		{ position: [0.07, 0, 0.65] },
		{ position: [0.43 + gap2 * 0, 0, 0.65] },
		{ position: [0.43 + gap2 * 1, 0, 0.65] },
		{ position: [0.43 + gap2 * 2, 0, 0.65] },
		{ position: [0.43 + gap2 * 3, 0, 0.65] },
		{ position: [0.43 + gap2 * 4, 0, 0.65] },
		{ position: [0.43 + gap2 * 5, 0, 0.65] },
		{ position: [0.43 + gap2 * 6, 0, 0.65] },
		{ position: [0.43 + gap2 * 7, 0, 0.65] },
		{ position: [0.43 + gap2 * 8, 0, 0.65] },
		{ position: [0.43 + gap2 * 9, 0, 0.65] },
		{ position: [0.43 + gap2 * 10, 0, 0.65] },
		{ position: [0.43 + gap2 * 11, 0, 0.65] },
		{ position: [0.5 + gap2 * 12, 0, 0.65] },
		{ position: [0.95 + gap2 * 12, 0, 0.65] },
		{ position: [0.11, 0, 0.94] },
		{ position: [0.51 + gap2 * 0, 0, 0.94] },
		{ position: [0.51 + gap2 * 1, 0, 0.94] },
		{ position: [0.51 + gap2 * 2, 0, 0.94] },
		{ position: [0.51 + gap2 * 3, 0, 0.94] },
		{ position: [0.51 + gap2 * 4, 0, 0.94] },
		{ position: [0.51 + gap2 * 5, 0, 0.94] },
		{ position: [0.51 + gap2 * 6, 0, 0.94] },
		{ position: [0.51 + gap2 * 7, 0, 0.94] },
		{ position: [0.51 + gap2 * 8, 0, 0.94] },
		{ position: [0.51 + gap2 * 9, 0, 0.94] },
		{ position: [0.51 + gap2 * 10, 0, 0.94] },
		{ position: [0.68 + gap2 * 11, 0, 0.94] },
		{ position: [0.95 + gap2 * 12, 0, 0.94] },
		{ position: [0.18, 0, 1.23] },
		{ position: [0.66 + gap2 * 0, 0, 1.23] },
		{ position: [0.66 + gap2 * 1, 0, 1.23] },
		{ position: [0.66 + gap2 * 2, 0, 1.23] },
		{ position: [0.66 + gap2 * 3, 0, 1.23] },
		{ position: [0.66 + gap2 * 4, 0, 1.23] },
		{ position: [0.66 + gap2 * 5, 0, 1.23] },
		{ position: [0.66 + gap2 * 6, 0, 1.23] },
		{ position: [0.66 + gap2 * 7, 0, 1.23] },
		{ position: [0.66 + gap2 * 8, 0, 1.23] },
		{ position: [0.66 + gap2 * 9, 0, 1.23] },
		{ position: [0.76 + gap2 * 10, 0, 1.23] },
		{ position: [0.03, 0, 1.52] },
		{ position: [0.39 + gap3 * 0, 0, 1.52] },
		{ position: [0.39 + gap3 * 1, 0, 1.52] },
		{ position: [1.49 + gap3 * 1, 0, 1.52] },
		{ position: [2.91 + gap2 * 0, 0, 1.52] },
		{ position: [2.91 + gap2 * 1, 0, 1.52] },
		{ position: [2.91 + gap2 * 2, 0, 1.52] },
		{ position: [1.24 + gap2 * 10, 0, 1.3] },
		{ position: [1.24 + gap2 * 9, 0, 1.59] },
		{ position: [1.24 + gap2 * 10, 0, 1.59] },
		{ position: [1.24 + gap2 * 11, 0, 1.59] },
	];

	return (
		<Instances
			nodes={nodes}
			color={color}
		>
			<>
				{switchData.map((props, i) => (
					<Model
						key={i}
						{...props}
					/>
				))}
			</>
		</Instances>
	);
}

function Instances({
	nodes,
	color,
	children,
	...props
}: {
	nodes: any;
	color: THREE.Color;
	children: ReactElement;
}) {
	const instances = useMemo(() => {
		const result = {
			Switch: nodes.Switch,
			Switch_1: nodes.Switch_1,
			Switch_Top: nodes.Switch_Top,
			Switch_Middle: nodes.Switch_Middle,
		};

		result.Switch_Middle.material.transparent = true;
		result.Switch_Middle.material.opacity = 0.3;

		return result;
	}, [nodes]);

	useMemo(() => {
		instances.Switch_Top.material.color = color;
	}, [color]);

	return (
		<Merged
			meshes={instances}
			{...props}
		>
			{(instances: any) => (
				<context.Provider
					value={instances}
					children={children}
				/>
			)}
		</Merged>
	);
}

// const config = {
// 	backside: false,
// 	samples: 16,
// 	resolution: 256,
// 	transmission: 0.75,
// 	roughness: 0.3,
// 	clearcoat: 0.1,
// 	clearcoatRoughness: 0.1,
// 	thickness: 200,
// 	backsideThickness: 200,
// 	ior: 1.03,
// 	chromaticAberration: 0,
// 	anisotropy: 1,
// 	distortion: 0,
// 	distortionScale: 0.2,
// 	min: 0.01,
// 	max: 1,
// 	step: 0.01,
// 	temporalDistortion: 0,
// 	attenuationDistance: 0.5,
// 	attenuationColor: '#ffffff',
// 	color: '#ffffff',
// };

function Model({ random, ...props }: { random?: number }) {
	const instances = useContext(context) as any;

	const ref = useRef<THREE.Group>(null);
	// const [hovered, setHover] = useState(false);
	// useFrame((state) => {
	// 	const t = state.clock.getElapsedTime() + random * 10000;
	// 	if (ref.current) {
	// 		ref.current.rotation.set(
	// 			Math.cos(t / 4) / 2,
	// 			Math.sin(t / 4) / 2,
	// 			Math.cos(t / 1.5) / 2
	// 		);
	// 		ref.current.position.y = Math.sin(t / 1.5) / 2;
	// 		ref.current.scale.x =
	// 			ref.current.scale.y =
	// 			ref.current.scale.z =
	// 				THREE.MathUtils.lerp(ref.current.scale.z, hovered ? 1.4 : 1, 0.1);

	// 		// ref.current.children[3].instance.current.material.color.lerp(
	// 		// 	new THREE.Color().set(hovered ? 'red' : 'white'),
	// 		// 	hovered ? 1 : 0.1
	// 		// );
	// 	}
	// });

	return (
		<group
			ref={ref}
			{...props}
			// onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
			// onPointerOut={(e) => setHover(false)}
			frustumCulled={false}
		>
			{instances && (
				<>
					<instances.Switch />
					<instances.Switch_1 />
					<instances.Switch_Middle />
					<instances.Switch_Top />
				</>
			)}
		</group>
	);
}
