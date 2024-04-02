import * as THREE from 'three';
import { ContactShadows, Decal, Environment, useGLTF, useTexture } from '@react-three/drei';
import { ReactElement } from 'react';
import { useControls } from 'leva';
import decalData from './decal';
import { Switches } from './Switches';

const colorThemes = [
	[
		{ color: '#FFFFFF', reverse: false },
		{ color: '#1F2B42', reverse: false },
		{ color: '#1CC0CB', reverse: false },
	],
	[
		{ color: '#405578', reverse: true },
		{ color: '#444444', reverse: true },
		{ color: '#b04040', reverse: false },
	],
];

export function Scene() {
	const knobNormal = useTexture(`assets/models/Keyboard/textures/Knob_Normal_Map.png`);
	const knobRoughness = useTexture(`assets/models/Keyboard/textures/Knob_Roughness_Map.png`);

	knobNormal.flipY = false;
	knobRoughness.flipY = false;
	const model = useGLTF('assets/models/Keyboard/Keychron Q1 Max.glb');
	const { nodes } = model;
	// console.log(nodes);

	const {
		knobColor,
		switchColor,
		showKeycaps,
		showSwitches,
		showKnob,
		showKnobHolder,
		showTopCase,
		showPlate,
		showIXPEFoam,
		showPETFilm,
		showBottomCase,
	} = useControls({
		knobColor: '#be806e',
		switchColor: '#e22626',
		showKeycaps: true,
		showSwitches: true,
		showKnob: true,
		showKnobHolder: true,
		showTopCase: true,
		showPlate: true,
		showIXPEFoam: true,
		showPETFilm: true,
		showBottomCase: true,
	});

	return (
		<>
			<ambientLight intensity={0.7} />
			<Environment preset='city' />

			{/* <primitive object={nodes.BottomCase} /> */}
			{/* <primitive object={keycaps} /> */}

			<ContactShadows
				position={[0, -0.8, 0]}
				opacity={0.8}
				scale={10}
				blur={1.5}
				far={0.8}
			/>

			<Switches
				nodes={nodes}
				color={new THREE.Color('#e22626')}
			/>

			{showKeycaps && <KeycapList nodes={nodes} />}

			{/* {showSwitches && (
				<SwitchList
					nodes={nodes}
					color={switchColor}
				/>
			)} */}

			{showKnob && (
				<mesh
					geometry={(nodes['Knob'] as THREE.Mesh).geometry}
					material={(nodes['Knob'] as THREE.Mesh).material}
					position={(nodes['Knob'] as THREE.Mesh).position}
					material-color={new THREE.Color(knobColor)}
					material-metalness={0.4}
					material-roughness={1}
					// material-roughnessMap={knobRoughness}
					castShadow={false}
				/>
			)}

			{showKnobHolder && (
				<mesh
					geometry={(nodes['E-100_Holder'] as THREE.Mesh).geometry}
					material={(nodes['E-100_Holder'] as THREE.Mesh).material}
					position={(nodes['E-100_Holder'] as THREE.Mesh).position}
					castShadow={false}
				/>
			)}

			{showTopCase && (
				<mesh
					geometry={(nodes.TopCase as THREE.Mesh).geometry}
					material={(nodes.TopCase as THREE.Mesh).material}
					position={(nodes.TopCase as THREE.Mesh).position}
					castShadow={false}
				/>
			)}

			{/* {showPlate && (
				<mesh
					geometry={(nodes.Plate as THREE.Mesh).geometry}
					material={(nodes.Plate as THREE.Mesh).material}
					position={(nodes.Plate as THREE.Mesh).position}
					castShadow={false}
				/>
			)} */}

			{showIXPEFoam && (
				<mesh
					geometry={(nodes.IXPEFoam as THREE.Mesh).geometry}
					material={(nodes.IXPEFoam as THREE.Mesh).material}
					position={(nodes.IXPEFoam as THREE.Mesh).position}
					castShadow={false}
				/>
			)}

			{showPETFilm && (
				<mesh
					geometry={(nodes.PETFilm as THREE.Mesh).geometry}
					material={(nodes.PETFilm as THREE.Mesh).material}
					position={(nodes.PETFilm as THREE.Mesh).position}
					castShadow={false}
				/>
			)}

			{showBottomCase && (
				<>
					<mesh
						geometry={(nodes.BottomCase as THREE.Mesh).geometry}
						material={(nodes.BottomCase as THREE.Mesh).material}
						position={(nodes.BottomCase as THREE.Mesh).position}
						castShadow={false}
					/>
					<mesh
						geometry={(nodes.BottomCase_Plate as THREE.Mesh).geometry}
						material={(nodes.BottomCase_Plate as THREE.Mesh).material}
						position={(nodes.BottomCase_Plate as THREE.Mesh).position}
						castShadow={false}
					/>
					<mesh
						geometry={(nodes.BottomCase_Screws as THREE.Mesh).geometry}
						material={(nodes.BottomCase_Screws as THREE.Mesh).material}
						position={(nodes.BottomCase_Screws as THREE.Mesh).position}
						castShadow={false}
					/>
				</>
			)}
		</>
	);
}

function KeycapList({ nodes }: { nodes: any }) {
	// console.log('KeycapList');

	const themeIndex = 1;

	const keyCapsTexture = useTexture(`assets/models/Keyboard/Keychron_Q1_Pro_KeyCaps_Texts_1.png`);
	const keyCapsReversedTexture = useTexture(
		`assets/models/Keyboard/Keycaps_Base_Color_Reverse.png`
	);
	const keyCapsNormal = useTexture(`assets/models/Keyboard/Keycaps Normal Map_Compressed.png`);

	keyCapsTexture.flipY = false;
	keyCapsReversedTexture.flipY = false;
	keyCapsNormal.flipY = false;

	// const { decaPosition, decaRotation, decaScale } = useControls({
	// 	decaPosition: {
	// 		value: { x: 1.77, y: 2.16, z: -0.12 },
	// 		step: 0.01,
	// 	},
	// 	decaRotation: {
	// 		value: { x: -Math.PI / 2, y: 0, z: 0 },
	// 		step: 0.01,
	// 	},
	// 	decaScale: {
	// 		value: { x: 0.2, y: 0.2, z: 0.2 },
	// 		step: 0.01,
	// 	},
	// });

	const primaryKeycapColor = new THREE.Color(colorThemes[themeIndex][0].color);
	const secondaryKeycapColor = new THREE.Color(colorThemes[themeIndex][1].color);
	const tertiaryKeycapColor = new THREE.Color(colorThemes[themeIndex][2].color);

	const keyCapsMaterial = new THREE.MeshStandardMaterial({
		// map: keyCapsTexture,
		// color: new THREE.Color('#fff'),
		normalMap: keyCapsNormal,
		// opacity: 0.3,
		// transparent: true,
	});

	const keyCapsPrimaryMaterial = keyCapsMaterial.clone();
	const keyCapsSecondaryyMaterial = keyCapsMaterial.clone();
	const keyCapsTertiaryMaterial = keyCapsMaterial.clone();

	keyCapsPrimaryMaterial.color = primaryKeycapColor;
	keyCapsSecondaryyMaterial.color = secondaryKeycapColor;
	keyCapsTertiaryMaterial.color = tertiaryKeycapColor;

	if (!colorThemes[themeIndex][0].reverse) {
		keyCapsPrimaryMaterial.map = keyCapsTexture;
	}
	if (!colorThemes[themeIndex][1].reverse) {
		keyCapsSecondaryyMaterial.map = keyCapsTexture;
	}
	if (!colorThemes[themeIndex][2].reverse) {
		keyCapsTertiaryMaterial.map = keyCapsTexture;
	}

	function getKeyCapMaterial(childName: string) {
		if (childName.indexOf('Primary') > -1) {
			return keyCapsPrimaryMaterial;
		}
		if (childName.indexOf('Secondary') > -1) {
			return keyCapsSecondaryyMaterial;
		}
		if (childName.indexOf('Tertiary') > -1) {
			return keyCapsTertiaryMaterial;
		}
	}

	let keycapsPrimaryList: ReactElement[] = [];
	let keycapsSecondaryList: ReactElement[] = [];
	let keycapsTertiaryList: ReactElement[] = [];

	function fillList(list: ReactElement[], length: number, theme: number, prefix: string) {
		for (let i = 0; i <= length; i++) {
			const suffix = i === 0 ? '' : determineNumLength(i, '000');
			const name = `Keycaps_${prefix}${suffix}`;
			const { position, scale } = (decalData as any)[name];

			list.push(
				<mesh
					key={name}
					name={name}
					geometry={(nodes[name] as THREE.Mesh).geometry}
					material={getKeyCapMaterial(name)}
					position={(nodes[name] as THREE.Mesh).position}
				>
					{colorThemes[themeIndex][theme].reverse && name !== `Keycaps_Primary053` && (
						<Decal
							// debug
							map={useTexture(`assets/models/Keyboard/textures/${name}_W.png`)}
							position={[position.x, 0.3, position.z]}
							rotation={[-Math.PI / 2, 0, 0]}
							scale={[scale.x, scale.y, scale.z]}
						/>
					)}
				</mesh>
			);
		}
	}

	fillList(keycapsPrimaryList, 57, 0, 'Primary');
	fillList(keycapsSecondaryList, 20, 1, 'Secondary');
	fillList(keycapsTertiaryList, 1, 2, 'Tertiary');

	const { showKeycasPrimary, showKeycapsSecondary, showKeycapsTertiary } = useControls({
		showKeycasPrimary: true,
		showKeycapsSecondary: true,
		showKeycapsTertiary: true,
	});

	return (
		<>
			{showKeycasPrimary && keycapsPrimaryList}
			{showKeycapsSecondary && keycapsSecondaryList}
			{showKeycapsTertiary && keycapsTertiaryList}
		</>
	);
}

// function SwitchList({ nodes, color }: { nodes: any; color: string | THREE.Color }) {
// 	// const config = useControls({
// 	// 	backside: false,
// 	// 	samples: { value: 16, min: 1, max: 32, step: 1 },
// 	// 	resolution: { value: 256, min: 64, max: 2048, step: 64 },
// 	// 	transmission: { value: 0.75, min: 0, max: 1 },
// 	// 	roughness: { value: 0.3, min: 0, max: 1, step: 0.01 },
// 	// 	clearcoat: { value: 0.1, min: 0, max: 1, step: 0.01 },
// 	// 	clearcoatRoughness: { value: 0.1, min: 0, max: 1, step: 0.01 },
// 	// 	thickness: { value: 200, min: 0, max: 200, step: 0.01 },
// 	// 	backsideThickness: { value: 200, min: 0, max: 200, step: 0.01 },
// 	// 	ior: { value: 1.03, min: 1, max: 5, step: 0.01 },
// 	// 	chromaticAberration: { value: 0, min: 0, max: 1 },
// 	// 	anisotropy: { value: 1, min: 0, max: 10, step: 0.01 },
// 	// 	distortion: { value: 0, min: 0, max: 1, step: 0.01 },
// 	// 	distortionScale: { value: 0.2, min: 0.01, max: 1, step: 0.01 },
// 	// 	temporalDistortion: { value: 0, min: 0, max: 1, step: 0.01 },
// 	// 	attenuationDistance: { value: 0.5, min: 0, max: 10, step: 0.01 },
// 	// 	attenuationColor: '#ffffff',
// 	// 	color: '#ffffff',
// 	// });

// 	const switchList = [];
// 	for (let i = 0; i <= 81; i++) {
// 		const suffix = i === 0 ? '' : determineNumLength(i, '000');

// 		switchList.push(
// 			<group key={i}>
// 				<mesh
// 					geometry={(nodes[`Switch${suffix}`] as THREE.Mesh).geometry}
// 					material={(nodes[`Switch${suffix}`] as THREE.Mesh).material}
// 					position={(nodes[`Switch${suffix}`] as THREE.Mesh).position}
// 				></mesh>

// 				<mesh
// 					geometry={(nodes[`Switch${suffix}_1`] as THREE.Mesh).geometry}
// 					material={(nodes[`Switch${suffix}_1`] as THREE.Mesh).material}
// 					position={(nodes[`Switch${suffix}_1`] as THREE.Mesh).position}
// 				></mesh>

// 				<mesh
// 					geometry={(nodes[`Switch_Bottom${suffix}`] as THREE.Mesh).geometry}
// 					material={(nodes[`Switch_Bottom${suffix}`] as THREE.Mesh).material}
// 					position={(nodes[`Switch_Bottom${suffix}`] as THREE.Mesh).position}
// 				></mesh>

// 				<mesh
// 					geometry={(nodes[`Switch_Middle${suffix}`] as THREE.Mesh).geometry}
// 					material={(nodes[`Switch_Middle${suffix}`] as THREE.Mesh).material}
// 					position={(nodes[`Switch_Middle${suffix}`] as THREE.Mesh).position}
// 					material-transparent={true}
// 					material-opacity={0.7}
// 					material-roughness={0.8}
// 				>
// 					{/* too heavy performance */}
// 					{/* <MeshTransmissionMaterial
// 						{...config}
// 						color={'#fef4ef'}
// 						toneMapped={false}
// 					/> */}
// 				</mesh>

// 				<mesh
// 					geometry={(nodes[`Switch_Top${suffix}`] as THREE.Mesh).geometry}
// 					material={(nodes[`Switch_Top${suffix}`] as THREE.Mesh).material}
// 					material-color={color}
// 					position={(nodes[`Switch_Top${suffix}`] as THREE.Mesh).position}
// 				></mesh>
// 			</group>
// 		);
// 	}

// 	return switchList;
// }

function determineNumLength(num: number | string, pad: string) {
	let str = '' + num;
	return pad.substring(0, pad.length - str.length) + str;
}

useGLTF.preload('assets/models/Keyboard/Keychron Q1 Max.glb');
[
	'assets/models/Keyboard/Keychron_Q1_Pro_KeyCaps_Texts_1.png',
	// 'Keycaps Base Color.png',
	'Keycaps Base Color_Reverse.png',
	'Keycaps Normal Map_Compressed',
].forEach(useTexture.preload);
