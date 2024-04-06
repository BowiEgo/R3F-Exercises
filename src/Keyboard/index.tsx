import { Canvas } from '@react-three/fiber';
import { Scene } from './Scene';
import { OrbitControls } from '@react-three/drei';
import { useControls } from 'leva';
import { mapEventChannel } from './event';

export default function LivingRoom() {
	const { bgColor } = useControls({
		bgColor: '#fff',
	});

	const queuingSwitches = () => {
		mapEventChannel.emit('queuingSwitches_A');
	};

	const showKeycaps = () => {
		// mapEventChannel.emit('showKeycaps_A');
		mapEventChannel.emit('showTopCase_A');
	};
	const expandKeyboard = () => {
		mapEventChannel.emit('expandKeyboard_A');
	};
	const assembleKeyboard = () => {
		mapEventChannel.emit('assembleKeyboard_A');
	};

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

			<div className='tempBtnList'>
				<button
					className='tempBtn'
					onClick={queuingSwitches}
				>
					queuingSwitches
				</button>
				<button
					className='tempBtn'
					onClick={showKeycaps}
				>
					showKeycaps
				</button>
				<button
					className='tempBtn'
					onClick={expandKeyboard}
				>
					expandKeyboard
				</button>
				<button
					className='tempBtn'
					onClick={assembleKeyboard}
				>
					assembleKeyboard
				</button>
			</div>
		</>
	);
}
