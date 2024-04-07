import * as THREE from 'three';
import { ContactShadows, Float, useGLTF, useTexture } from '@react-three/drei';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useControls } from 'leva';
import { decalList } from './decal';
import { Switches } from './Switches';
import { Env } from './Env';
import { Keycaps } from './Keycaps';
import { colorThemes } from './store';
import { EventChannel } from './event';
import { useFrame, useThree } from '@react-three/fiber';
import {
	assembleBottomBody,
	assembleTopBody,
	cameraAnimation,
	expandWholeBody,
} from './Animations';

export function Scene() {
	const [switchesQueued, setSwitchesQueued] = useState(false);

	const animation_camera = useRef<GSAPTimeline>(null!);
	const animation_1 = useRef<GSAPTimeline>(null!);
	const animation_2 = useRef<GSAPTimeline>(null!);
	const animation_3 = useRef<GSAPTimeline>(null!);

	const keycaps = useRef<any>(null!);
	const knob = useRef<THREE.Mesh>(null!);
	const knobHolder = useRef<THREE.Mesh>(null!);
	const switches = useRef<THREE.Group>(null!);
	const topCase = useRef<THREE.Mesh>(null!);
	const plate = useRef<THREE.Mesh>(null!);
	const IXPEFoam = useRef<THREE.Mesh>(null!);
	const PETFilm = useRef<THREE.Mesh>(null!);
	const bottomCase = useRef<THREE.Group>(null!);
	const contactShadow = useRef<THREE.Group>(null!);

	const { camera } = useThree();

	const knobNormal = useTexture(`assets/models/Keyboard/textures/Knob_Normal_Map.png`);
	const knobRoughness = useTexture(`assets/models/Keyboard/textures/Knob_Roughness_Map.png`);

	knobNormal.flipY = false;
	knobRoughness.flipY = false;
	const model = useGLTF('assets/models/Keyboard/Keychron Q1 Max.glb');
	const { nodes } = model;

	const topCaseMaterial = useMemo(() => {
		return (
			(nodes.TopCase as THREE.Mesh).material as THREE.Material
		).clone() as THREE.MeshStandardMaterial;
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
		showSwitches,
		showKnob,
		showKnobHolder,
		showTopCase,
		showPlate,
		showIXPEFoam,
		showPETFilm,
		showBottomCase,
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
		expandProgress: { value: 0, min: 0, max: 1 },
	});

	useLayoutEffect(() => {
		animation_camera.current = cameraAnimation({ camera });

		animation_1.current = assembleBottomBody({
			plate: plate.current,
			IXPEFoam: IXPEFoam.current,
			PETFilm: PETFilm.current,
			bottomCase: bottomCase.current,
		});

		animation_2.current = assembleTopBody({
			keycaps: keycaps.current.getEl(),
			keycapsMaterial: keycaps.current.getMaterials(),
			knob: knob.current,
			knobHolder: knobHolder.current,
			topCase: topCase.current,
		});

		animation_3.current = expandWholeBody({
			keycaps: keycaps.current.getEl(),
			switches: switches.current,
			knob: knob.current,
			knobHolder: knobHolder.current,
			topCase: topCase.current,
			plate: plate.current,
			IXPEFoam: IXPEFoam.current,
			PETFilm: PETFilm.current,
			bottomCase: bottomCase.current,
		});
	}, []);

	useEffect(() => {
		const unsubscribeCameraMotion_A = EventChannel.on('cameraMotion_A', (forward: boolean) => {
			if (forward) {
				animation_camera.current.tweenTo(animation_camera.current.nextLabel());
			} else {
				animation_camera.current.tweenTo(animation_camera.current.previousLabel());
			}
		});

		const unsubscribeShowTopCase_A = EventChannel.on('showTopCase_A', (forward: boolean) => {
			if (forward) {
				animation_2.current.play(0).timeScale(1);
				keycaps.current.showDecal(true);
			} else {
				animation_2.current.timeScale(1).reverse();
				keycaps.current.showDecal(false);
			}
		});

		const unsubscribeExpandKeyboard_A = EventChannel.on(
			'expandKeyboard_A',
			(forward: boolean) => {
				forward
					? animation_3.current.play(0).timeScale(1)
					: animation_3.current.timeScale(1).reverse();
			}
		);

		return () => {
			unsubscribeCameraMotion_A();
			unsubscribeShowTopCase_A();
			unsubscribeExpandKeyboard_A();
		};
	}, []);

	useEffect(() => {
		const unsubscribeQueuingSwitches_A = EventChannel.on(
			'queuingSwitches_A',
			(forward: boolean) => {
				setSwitchesQueued(forward);

				forward
					? animation_1.current.play(0).timeScale(1)
					: animation_1.current.timeScale(20).reverse();
			}
		);

		return () => {
			unsubscribeQueuingSwitches_A();
		};
	}, [switchesQueued]);

	useEffect(() => {
		topCaseMaterial.color.set(colorThemes[theme].case.color);
		knobMaterial.color.set(colorThemes[theme].knob.color);
	}, [theme]);

	const { cameraX, cameraY, cameraZ } = useControls({
		cameraX: { value: -5 },
		cameraY: { value: 4 },
		cameraZ: { value: 4 },
	});

	useEffect(() => {
		camera.position.set(cameraX, cameraY, cameraZ);
	}, [cameraX, cameraY, cameraZ]);

	useFrame(() => {
		lerpOpacity(contactShadow.current, switchesQueued);
	});

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
				position={[0, -2.3, 0]}
				scale={10}
				blur={2.5}
				far={2.3}
			/>

			<Float speed={0}>
				<Switches
					ref={switches}
					nodes={nodes}
					visible={showSwitches}
					color={new THREE.Color(switchColor)}
					isQueued={switchesQueued}
				/>

				<Keycaps
					ref={keycaps}
					nodes={nodes}
					theme={theme}
					showKeycasPrimary={showKeycasPrimary}
					showKeycapsSecondary={showKeycapsSecondary}
					showKeycapsTertiary={showKeycapsTertiary}
				/>

				<mesh
					ref={knob}
					visible={showKnob}
					geometry={(nodes['Knob'] as THREE.Mesh).geometry}
					position={(nodes['Knob'] as THREE.Mesh).position}
					material={(nodes['Knob'] as THREE.Mesh).material}
					material-metalness={0.4}
					material-roughness={0.4}
					// material-roughnessMap={knobRoughness}
					material-transparent={true}
					castShadow={false}
				/>

				<mesh
					ref={knobHolder}
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
					position={(nodes.Plate as THREE.Mesh).position}
					material={(nodes.Plate as THREE.Mesh).material}
					material-transparent={true}
					castShadow={false}
				/>

				<mesh
					ref={IXPEFoam}
					visible={showIXPEFoam}
					geometry={(nodes.IXPEFoam as THREE.Mesh).geometry}
					position={(nodes.IXPEFoam as THREE.Mesh).position}
					material={(nodes.IXPEFoam as THREE.Mesh).material}
					material-transparent={true}
					castShadow={false}
				/>

				<mesh
					ref={PETFilm}
					visible={showPETFilm}
					geometry={(nodes.PETFilm as THREE.Mesh).geometry}
					position={(nodes.PETFilm as THREE.Mesh).position}
					material={(nodes.PETFilm as THREE.Mesh).material}
					material-transparent={true}
					castShadow={false}
				/>

				<group
					ref={bottomCase}
					visible={showBottomCase}
				>
					<mesh
						geometry={(nodes.BottomCase as THREE.Mesh).geometry}
						position={(nodes.BottomCase as THREE.Mesh).position}
						material={(nodes.BottomCase as THREE.Mesh).material}
						material-transparent={true}
						castShadow={false}
					/>
					<mesh
						geometry={(nodes.BottomCase_Plate as THREE.Mesh).geometry}
						position={(nodes.BottomCase_Plate as THREE.Mesh).position}
						material={(nodes.BottomCase_Plate as THREE.Mesh).material}
						material-transparent={true}
						castShadow={false}
					/>
					<mesh
						geometry={(nodes.BottomCase_Screws as THREE.Mesh).geometry}
						position={(nodes.BottomCase_Screws as THREE.Mesh).position}
						material={(nodes.BottomCase_Screws as THREE.Mesh).material}
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
				child.material.transparent = true;
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
