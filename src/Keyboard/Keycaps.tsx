import * as THREE from 'three';
import { Decal, useTexture } from '@react-three/drei';
import { useEffect, useMemo } from 'react';
import { decalList } from './decal';
import { colorThemes } from './store';

export function Keycaps({
	nodes,
	theme = 0,
	showKeycasPrimary = true,
	showKeycapsSecondary = true,
	showKeycapsTertiary = true,
	visible,
}: {
	nodes: any;
	theme: number;
	showKeycasPrimary: boolean;
	showKeycapsSecondary: boolean;
	showKeycapsTertiary: boolean;
	visible: boolean;
}) {
	const keyCapsTexture = useTexture(`assets/models/Keyboard/Keychron_Q1_Pro_KeyCaps_Texts_1.png`);
	const keyCapsNormal = useTexture(`assets/models/Keyboard/Keycaps Normal Map_Compressed.png`);
	keyCapsTexture.flipY = false;
	keyCapsNormal.flipY = false;

	const keyCapMaterials = {
		primary: useMemo(
			() =>
				new THREE.MeshStandardMaterial({
					normalMap: keyCapsNormal,
					color: new THREE.Color(),
				}),
			[]
		),
		secondary: useMemo(
			() =>
				new THREE.MeshStandardMaterial({
					normalMap: keyCapsNormal,
					color: new THREE.Color(),
				}),
			[]
		),
		tertiary: useMemo(
			() =>
				new THREE.MeshStandardMaterial({
					normalMap: keyCapsNormal,
					color: new THREE.Color(),
				}),
			[]
		),
	};

	useEffect(() => {
		keyCapMaterials.primary.color.set(colorThemes[theme].primary.color);
		keyCapMaterials.secondary.color.set(colorThemes[theme].secondary.color);
		keyCapMaterials.tertiary.color.set(colorThemes[theme].tertiary.color);

		keyCapMaterials.primary.map = colorThemes[theme].primary.reverse ? null : keyCapsTexture;
		keyCapMaterials.secondary.map = colorThemes[theme].secondary.reverse
			? null
			: keyCapsTexture;
		keyCapMaterials.tertiary.map = colorThemes[theme].tertiary.reverse ? null : keyCapsTexture;

		keyCapMaterials.primary.needsUpdate = true;
		keyCapMaterials.secondary.needsUpdate = true;
		keyCapMaterials.tertiary.needsUpdate = true;
	}, [theme]);

	return (
		<group visible={visible}>
			{decalList.map((item) => (
				<mesh
					key={item.name}
					visible={
						(item.type === 'primary' && showKeycasPrimary) ||
						(item.type === 'secondary' && showKeycapsSecondary) ||
						(item.type === 'tertiary' && showKeycapsTertiary)
					}
					name={item.name}
					geometry={(nodes[item.name] as THREE.Mesh).geometry}
					material={keyCapMaterials[item.type]}
					position={(nodes[item.name] as THREE.Mesh).position}
				>
					{item.name !== `Keycaps_Primary053` && (
						<Decal
							// debug
							visible={colorThemes[theme][item.type].reverse}
							map={useTexture(`assets/models/Keyboard/textures/${item.name}_W.png`)}
							position={[item.position.x, 0.3, item.position.z]}
							rotation={[-Math.PI / 2, 0, 0]}
							scale={[item.scale.x, item.scale.y, item.scale.z]}
						/>
					)}
				</mesh>
			))}
		</group>
	);
}

// const context = createContext(null);

// export function Keycaps({ nodes }: { nodes: any }) {
// 	return (
// 		<Instances nodes={nodes}>
// 			<>
// 				{keyCapsData.map((row) =>
// 					row.map(
// 						(props, i) =>
// 							props && (
// 								<Model
// 									key={props.instanceName + i}
// 									{...props}
// 								/>
// 							)
// 					)
// 				)}
// 			</>
// 		</Instances>
// 	);
// }

// function Instances({ nodes, children, ...props }: { nodes: any; children: ReactElement }) {
// 	// const keyCapsTexture = useTexture(`assets/models/Keyboard/Keychron_Q1_Pro_KeyCaps_Texts_1.png`);
// 	// const keyCapsReversedTexture = useTexture(
// 	// 	`assets/models/Keyboard/Keycaps_Base_Color_Reverse.png`
// 	// );
// 	// const keyCapsNormal = useTexture(`assets/models/Keyboard/Keycaps Normal Map_Compressed.png`);

// 	// const keyCapsMaterial = new THREE.MeshStandardMaterial({
// 	// 	// map: keyCapsTexture,
// 	// 	// color: new THREE.Color('#fff'),
// 	// 	normalMap: keyCapsNormal,
// 	// 	// opacity: 0.3,
// 	// 	// transparent: true,
// 	// });

// 	const instances = useMemo(() => {
// 		const result = {
// 			Row1_001: nodes.Keycaps_Tertiary002,
// 			Row2_001: nodes.Keycaps_Secondary021,
// 			Row2_002: nodes.Keycaps_Secondary022,
// 			Row3_001: nodes.Keycaps_Secondary023,
// 			Row3_002: nodes.Keycaps_Primary059,
// 			Row4_001: nodes.Keycaps_Secondary024,
// 			Row4_002: nodes.Keycaps_Primary060,
// 			Row4_003: nodes.Keycaps_Tertiary003,
// 			Row5_001: nodes.Keycaps_Secondary025,
// 			Row5_002: nodes.Keycaps_Primary061,
// 			Row5_003: nodes.Keycaps_Secondary026,
// 			Row6_001: nodes.Keycaps_Secondary028,
// 			Row6_002: nodes.Keycaps_Primary058,
// 			Row6_003: nodes.Keycaps_Secondary027,
// 			Row7_001: nodes.Keycaps_Secondary027,
// 		};

// 		console.log(nodes.Keycaps_Tertiary002.geometry.attributes.uv);

// 		// result.Row1_001.material = keyCapsMaterial;
// 		// result.Row1_001.material = new THREE.MeshNormalMaterial();
// 		// result.Row1_001.material.color = new THREE.Color(0xff0000);

// 		return result;
// 	}, [nodes]);

// 	return (
// 		<>
// 			<Merged
// 				meshes={instances}
// 				{...props}
// 			>
// 				{(instances: any) => (
// 					<context.Provider
// 						value={instances}
// 						children={children}
// 					/>
// 				)}
// 			</Merged>
// 		</>
// 	);
// }

// function Model({
// 	instanceName,
// 	children,
// 	...props
// }: {
// 	instanceName: string;
// 	children?: ReactElement;
// }) {
// 	const instances = useContext(context) as any;

// 	switch (instanceName) {
// 		case 'Row1_001':
// 			return <instances.Row1_001 {...props}>{children}</instances.Row1_001>;
// 		case 'Row2_001':
// 			return <instances.Row2_001 {...props} />;
// 		case 'Row2_002':
// 			return <instances.Row2_002 {...props} />;
// 		case 'Row3_001':
// 			return <instances.Row3_001 {...props} />;
// 		case 'Row3_002':
// 			return <instances.Row3_002 {...props} />;
// 		case 'Row4_001':
// 			return <instances.Row4_001 {...props} />;
// 		case 'Row4_002':
// 			return <instances.Row4_002 {...props} />;
// 		case 'Row4_003':
// 			return <instances.Row4_003 {...props} />;
// 		case 'Row5_001':
// 			return <instances.Row5_001 {...props} />;
// 		case 'Row5_002':
// 			return <instances.Row5_002 {...props} />;
// 		case 'Row5_003':
// 			return <instances.Row5_003 {...props} />;
// 		case 'Row6_001':
// 			return <instances.Row6_001 {...props} />;
// 		case 'Row6_002':
// 			return <instances.Row6_002 {...props} />;
// 		case 'Row6_003':
// 			return <instances.Row6_003 {...props} />;
// 		case 'Row7_001':
// 			return <instances.Row7_001 {...props} />;
// 		default:
// 			return null;
// 	}
// }
