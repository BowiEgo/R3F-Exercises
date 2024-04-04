import * as THREE from 'three';
import { ContactShadows, Float, useGLTF, useTexture } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
import { useControls } from 'leva';
import { decalList } from './decal';
import { Switches } from './Switches';
import { useFrame } from '@react-three/fiber';
import { Env } from './Env';
import { Keycaps } from './Keycaps';
import { colorThemes } from './store';

export function Scene() {
	const topCase = useRef<THREE.Mesh>(null!);
	const plate = useRef<THREE.Mesh>(null!);
	const IXPEFoam = useRef<THREE.Mesh>(null!);
	const PETFilm = useRef<THREE.Mesh>(null!);
	const bottomCase = useRef<THREE.Group>(null!);
	const contactShadow = useRef<THREE.Group>(null!);

	const knobNormal = useTexture(`assets/models/Keyboard/textures/Knob_Normal_Map.png`);
	const knobRoughness = useTexture(`assets/models/Keyboard/textures/Knob_Roughness_Map.png`);

	knobNormal.flipY = false;
	knobRoughness.flipY = false;
	const model = useGLTF('assets/models/Keyboard/Keychron Q1 Max.glb');
	const { nodes } = model;

	const topCaseMaterial = useMemo(() => {
		return (nodes.TopCase as THREE.Mesh).material as THREE.MeshStandardMaterial;
	}, []);

	const knobMaterial = useMemo(() => {
		return (nodes.Knob as THREE.Mesh).material as THREE.MeshStandardMaterial;
	}, []);

	const {
		theme,
		showKeycasPrimary,
		showKeycapsSecondary,
		showKeycapsTertiary,
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
		isSwitchesQueued,
	} = useControls({
		theme: {
			value: 0,
			options: [0, 1, 2],
		},
		showKeycasPrimary: true,
		showKeycapsSecondary: true,
		showKeycapsTertiary: true,
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
		isSwitchesQueued: true,
	});

	useFrame((_state) => {
		contactShadow.current && lerpOpacity(contactShadow.current, isSwitchesQueued);
		topCase.current && lerpOpacity(topCase.current, isSwitchesQueued);
		plate.current && lerpOpacity(plate.current, isSwitchesQueued);
		IXPEFoam.current && lerpOpacity(IXPEFoam.current, isSwitchesQueued);
		PETFilm.current && lerpOpacity(PETFilm.current, isSwitchesQueued);
		bottomCase.current && lerpOpacity(bottomCase.current, isSwitchesQueued);
	});

	useEffect(() => {
		console.log(nodes);
	}, [nodes]);

	useEffect(() => {
		topCaseMaterial.color.set(colorThemes[theme].case.color);
		knobMaterial.color.set(colorThemes[theme].knob.color);
	}, [theme]);

	return (
		<>
			<ambientLight intensity={0.7} />

			<Env />

			{/* <AccumulativeShadows
				temporal
				frames={200}
				color='purple'
				colorBlend={0.5}
				opacity={1}
				scale={10}
				alphaTest={0.85}
			>
				<RandomizedLight
					amount={8}
					radius={5}
					ambient={0.5}
					position={[5, 3, 2]}
					bias={0.001}
				/>
			</AccumulativeShadows> */}

			<ContactShadows
				ref={contactShadow}
				position={[0, -0.8, 0]}
				scale={10}
				blur={2.5}
				far={0.8}
			/>

			<Float speed={0}>
				<Switches
					nodes={nodes}
					visible={showSwitches}
					color={new THREE.Color(switchColor)}
					isQueued={isSwitchesQueued}
				/>

				<Keycaps
					nodes={nodes}
					theme={theme}
					showKeycasPrimary={showKeycasPrimary}
					showKeycapsSecondary={showKeycapsSecondary}
					showKeycapsTertiary={showKeycapsTertiary}
					visible={showKeycaps}
				/>

				<mesh
					visible={showKnob}
					geometry={(nodes['Knob'] as THREE.Mesh).geometry}
					position={(nodes['Knob'] as THREE.Mesh).position}
					material={knobMaterial}
					material-metalness={0.4}
					material-roughness={1}
					// material-roughnessMap={knobRoughness}
					material-transparent={true}
					castShadow={false}
				/>

				<mesh
					visible={showKnobHolder}
					geometry={(nodes['E-100_Holder'] as THREE.Mesh).geometry}
					position={(nodes['E-100_Holder'] as THREE.Mesh).position}
					material={topCaseMaterial}
					material-roughness={0.8}
					castShadow={false}
				/>

				<mesh
					ref={topCase}
					visible={showTopCase}
					geometry={(nodes.TopCase as THREE.Mesh).geometry}
					position={(nodes.TopCase as THREE.Mesh).position}
					material={topCaseMaterial}
					material-roughness={0.8}
					material-transparent={true}
					castShadow={false}
				/>

				<mesh
					ref={plate}
					visible={showPlate}
					geometry={(nodes.Plate as THREE.Mesh).geometry}
					material={(nodes.Plate as THREE.Mesh).material}
					position={(nodes.Plate as THREE.Mesh).position}
					material-transparent={true}
					castShadow={false}
				/>

				<mesh
					ref={IXPEFoam}
					visible={showIXPEFoam}
					geometry={(nodes.IXPEFoam as THREE.Mesh).geometry}
					material={(nodes.IXPEFoam as THREE.Mesh).material}
					position={(nodes.IXPEFoam as THREE.Mesh).position}
					material-transparent={true}
					castShadow={false}
				/>

				<mesh
					ref={PETFilm}
					visible={showPETFilm}
					geometry={(nodes.PETFilm as THREE.Mesh).geometry}
					material={(nodes.PETFilm as THREE.Mesh).material}
					position={(nodes.PETFilm as THREE.Mesh).position}
					material-transparent={true}
					castShadow={false}
				/>

				<group
					ref={bottomCase}
					visible={showBottomCase}
				>
					<mesh
						geometry={(nodes.BottomCase as THREE.Mesh).geometry}
						material={(nodes.BottomCase as THREE.Mesh).material}
						position={(nodes.BottomCase as THREE.Mesh).position}
						material-transparent={true}
						castShadow={false}
					/>
					<mesh
						geometry={(nodes.BottomCase_Plate as THREE.Mesh).geometry}
						material={(nodes.BottomCase_Plate as THREE.Mesh).material}
						position={(nodes.BottomCase_Plate as THREE.Mesh).position}
						material-transparent={true}
						castShadow={false}
					/>
					<mesh
						geometry={(nodes.BottomCase_Screws as THREE.Mesh).geometry}
						material={(nodes.BottomCase_Screws as THREE.Mesh).material}
						position={(nodes.BottomCase_Screws as THREE.Mesh).position}
						material-transparent={true}
						castShadow={false}
					/>
				</group>
			</Float>
		</>
	);
}

function lerpOpacity(target: THREE.Mesh | THREE.Group, isSwitchesQueued: boolean) {
	function lerp(material: any) {
		material.opacity = THREE.MathUtils.lerp(
			material.opacity,
			isSwitchesQueued ? 1 : 0,
			isSwitchesQueued ? 0.05 : 0.5
		);
	}

	if (target instanceof THREE.Group) {
		target.children.forEach((child) => {
			if (child instanceof THREE.Mesh) {
				lerp(child.material as THREE.Material);
			}
		});
	} else if (target instanceof THREE.Mesh) {
		lerp(target.material);
	}
}

useGLTF.preload('assets/models/Keyboard/Keychron Q1 Max.glb');
[
	'Keycaps Base Color_Reverse.png',
	'Keycaps Normal Map_Compressed',
	...decalList.map((item) => `assets/models/Keyboard/textures/${item.name}_W.png`),
].forEach(useTexture.preload);
