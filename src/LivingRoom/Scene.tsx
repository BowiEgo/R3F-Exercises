import * as THREE from 'three';
import {
	MeshReflectorMaterial,
	PresentationControls,
	useGLTF,
	useTexture,
} from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useSpring } from '@react-spring/three';

export function Scene() {
	const { nodes } = useGLTF('assets/models/LivingRoom/Isometric_Bedroom.glb');
	const bakedTexture = useTexture('assets/models/LivingRoom/baked.jpg');
	const photoTexture = useTexture('assets/models/LivingRoom/WechatIMG339.jpeg');
	// const env = useEnvironment({ preset: 'city' });
	// photoTexture.repeat.set(1, 1);

	const photoPosition = new THREE.Vector3().copy(nodes.photo_portrait002.position);
	const photoRotation = new THREE.Euler().copy(nodes.photo_portrait002.rotation);
	photoPosition.x += 0.055;
	photoPosition.z += 0.07;
	photoRotation.x -= 0.13;

	const { camera } = useThree();
	useSpring(
		() => ({
			from: { y: camera.position.y + 20 },
			to: { y: camera.position.y },
			config: { friction: 100 },
			onChange: ({ value }: { value: THREE.Vector3 }) => (
				(camera.position.y = value.y), camera.lookAt(0, 0, 0)
			),
		}),
		[]
	);

	/**
	 * Mirror
	 */

	return (
		<>
			<ambientLight intensity={0.25} />

			<PresentationControls
				global
				zoom={0.8}
				rotation={[0, -Math.PI / 4, 0]}
				polar={[0, Math.PI / 4]}
				azimuth={[-Math.PI / 4, Math.PI / 4]}
			>
				<group
					position-y={-0.85}
					dispose={null}
				>
					<mesh
						position={[1.56, 1.5, -1.9]}
						rotation={[-0.18, 0, 0]}
					>
						<planeGeometry args={[1, 3]} />
						<MeshReflectorMaterial
							blur={[0, 0]} // Blur ground reflections (width, height), 0 skips blur
							mixBlur={0} // How much blur mixes with surface roughness (default = 1)
							mixStrength={8} // Strength of the reflections
							mixContrast={1} // Contrast of the reflections
							resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
							mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
							depthScale={0} // Scale the depth factor (0 = no depth, default = 0)
							minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
							maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
							depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
							distortion={1} // Amount of distortion based on the distortionMap texture
							reflectorOffset={0.2} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
						/>
					</mesh>

					<mesh
						geometry={(nodes.baked049 as THREE.Mesh).geometry}
						position={(nodes.baked049 as THREE.Mesh).position}
					>
						<meshBasicMaterial
							map={bakedTexture}
							map-flipY={false}
						/>
					</mesh>

					<mesh
						geometry={(nodes.candle001 as THREE.Mesh).geometry}
						position={(nodes.candle001 as THREE.Mesh).position}
					>
						<meshBasicMaterial color='#ffffe5' />
					</mesh>

					<mesh
						geometry={(nodes.curtain002 as THREE.Mesh).geometry}
						position={(nodes.curtain002 as THREE.Mesh).position}
						rotation={(nodes.curtain002 as THREE.Mesh).rotation}
					>
						<meshBasicMaterial
							color='#ffffe5'
							transparent={true}
							opacity={0.8}
						/>
					</mesh>

					<mesh
						geometry={(nodes.laptop_screen002 as THREE.Mesh).geometry}
						position={(nodes.laptop_screen002 as THREE.Mesh).position}
						rotation={(nodes.laptop_screen002 as THREE.Mesh).rotation}
					>
						<meshBasicMaterial color='#ffffe5' />
					</mesh>

					<mesh
						geometry={(nodes.light001 as THREE.Mesh).geometry}
						position={(nodes.light001 as THREE.Mesh).position}
						rotation={(nodes.light001 as THREE.Mesh).rotation}
					>
						<meshBasicMaterial color='#ffffe5' />
					</mesh>

					<mesh
						geometry={(nodes.light_small007 as THREE.Mesh).geometry}
						position={(nodes.light_small007 as THREE.Mesh).position}
						rotation={(nodes.light_small007 as THREE.Mesh).rotation}
					>
						<meshBasicMaterial color='#ffffe5' />
					</mesh>

					<mesh
						geometry={(nodes.light_small008 as THREE.Mesh).geometry}
						position={(nodes.light_small008 as THREE.Mesh).position}
						rotation={(nodes.light_small008 as THREE.Mesh).rotation}
					>
						<meshBasicMaterial color='#ffffe5' />
					</mesh>

					<mesh
						geometry={(nodes.light_small009 as THREE.Mesh).geometry}
						position={(nodes.light_small009 as THREE.Mesh).position}
						rotation={(nodes.light_small009 as THREE.Mesh).rotation}
					>
						<meshBasicMaterial color='#ffffe5' />
					</mesh>

					<mesh
						geometry={(nodes.light_small010 as THREE.Mesh).geometry}
						position={(nodes.light_small010 as THREE.Mesh).position}
						rotation={(nodes.light_small010 as THREE.Mesh).rotation}
					>
						<meshBasicMaterial color='#ffffe5' />
					</mesh>

					<mesh
						geometry={(nodes.light_small011 as THREE.Mesh).geometry}
						position={(nodes.light_small011 as THREE.Mesh).position}
						rotation={(nodes.light_small011 as THREE.Mesh).rotation}
					>
						<meshBasicMaterial color='#ffffe5' />
					</mesh>

					<mesh
						geometry={(nodes.light_small012 as THREE.Mesh).geometry}
						position={(nodes.light_small012 as THREE.Mesh).position}
						rotation={(nodes.light_small012 as THREE.Mesh).rotation}
					>
						<meshBasicMaterial color='#ffffe5' />
					</mesh>

					<mesh
						geometry={(nodes.light_small013 as THREE.Mesh).geometry}
						position={(nodes.light_small013 as THREE.Mesh).position}
						rotation={(nodes.light_small013 as THREE.Mesh).rotation}
					>
						<meshBasicMaterial color='#ffffe5' />
					</mesh>

					<mesh
						geometry={(nodes.Text002 as THREE.Mesh).geometry}
						position={(nodes.Text002 as THREE.Mesh).position}
						rotation={(nodes.Text002 as THREE.Mesh).rotation}
					>
						<meshBasicMaterial color='#ffffe5' />
					</mesh>

					{/* <mesh
				geometry={(nodes.mirror002 as THREE.Mesh).geometry}
				position={(nodes.mirror002 as THREE.Mesh).position}
				rotation={(nodes.mirror002 as THREE.Mesh).rotation}
			>
				<meshBasicMaterial color='#222' />
			</mesh> */}

					{/* <mesh
						geometry={(nodes.photo_portrait002 as THREE.Mesh).geometry}
						position={(nodes.photo_portrait002 as THREE.Mesh).position}
						rotation={(nodes.photo_portrait002 as THREE.Mesh).rotation}
					>
						<meshBasicMaterial map={photoTexture} />
					</mesh> */}

					<mesh
						position={photoPosition}
						rotation={photoRotation}
						scale={new THREE.Vector3(0.55, 0.5, 1)}
					>
						<planeGeometry args={[1, 1, 1]} />
						<meshBasicMaterial map={photoTexture} />
					</mesh>
				</group>
			</PresentationControls>
		</>
	);
}
