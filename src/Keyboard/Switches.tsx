import * as THREE from 'three';
import {
	ForwardedRef,
	ReactElement,
	createContext,
	forwardRef,
	useContext,
	useMemo,
	useRef,
} from 'react';
import { Merged } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { switchData } from './datas';

const context = createContext(null);

export const Switches = forwardRef(function Switches(
	{
		nodes,
		visible,
		color,
		isQueued,
	}: {
		nodes: any;
		visible: boolean;
		color: THREE.Color;
		isQueued: boolean;
	},
	ref: ForwardedRef<THREE.Group>
) {
	return (
		<Instances
			nodes={nodes}
			color={color}
		>
			<group ref={ref}>
				{switchData.map((row, i) =>
					row.map((props, j) => (
						<Model
							key={i + j}
							visible={visible}
							isQueued={isQueued}
							targetPosition={props.position}
							{...props}
						/>
					))
				)}
			</group>
		</Instances>
	);
});

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
			Switch_BaseModel: nodes.Switch_BaseModel,
			Switch_Top: nodes.Switch_Top,
			Switch_Bottom: nodes.Switch_Bottom,
		};

		result.Switch_BaseModel.material.transparent = true;
		result.Switch_BaseModel.material.opacity = 0.6;

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

function Model({
	isQueued,
	random,
	targetPosition,
	visible,
	...props
}: {
	isQueued: boolean;
	random: number;
	targetPosition: number[];
	visible: boolean;
}) {
	const instances = useContext(context) as any;

	const ref = useRef<THREE.Group>(null);

	// const [hovered, setHover] = useState(false);
	useFrame((state) => {
		const t = state.clock.getElapsedTime() + random * 10000;
		if (ref.current) {
			ref.current.rotation.set(
				THREE.MathUtils.lerp(
					ref.current.rotation.x,
					isQueued ? 0 : Math.cos(t / 4) / 2,
					0.1
				),
				THREE.MathUtils.lerp(
					ref.current.rotation.y,
					isQueued ? 0 : Math.sin(t / 4) / 2,
					0.1
				),
				THREE.MathUtils.lerp(
					ref.current.rotation.z,
					isQueued ? 0 : Math.cos(t / 1.5) / 2,
					0.1
				)
			);

			ref.current.position.set(
				THREE.MathUtils.lerp(
					ref.current.position.x,
					isQueued ? targetPosition[0] : Math.sin(t / 200) * 6 + 2.5,
					0.08
				),
				THREE.MathUtils.lerp(
					ref.current.position.y,
					isQueued ? 0 : Math.sin(t / 1.5) / 2,
					0.08
				),
				THREE.MathUtils.lerp(
					ref.current.position.z,
					isQueued ? targetPosition[2] : Math.sin(t / 100) * 4,
					0.08
				)
			);

			ref.current.scale.x =
				ref.current.scale.y =
				ref.current.scale.z =
					THREE.MathUtils.lerp(ref.current.scale.z, 1, 0.1);
		}
	});

	return (
		<group
			ref={ref}
			{...props}
			// onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
			// onPointerOut={(e) => setHover(false)}
			frustumCulled={false}
		>
			{instances && visible && (
				<>
					<instances.Switch />
					<instances.Switch_1 />
					<instances.Switch_BaseModel />
					<instances.Switch_Top />
				</>
			)}
		</group>
	);
}
