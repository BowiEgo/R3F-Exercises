import { Canvas } from '@react-three/fiber';
import { Scene } from './Scene';
import { ScrollControls } from '@react-three/drei';
import { useControls } from 'leva';
import { EventChannel } from './event';
import { useEffect } from 'react';
import useStore from './store';

export default function LivingRoom() {
	const { bgColor } = useControls({
		bgColor: '#fff',
	});

	// const { nextPhase, prevPhase } = useStore();

	useEffect(() => {
		const unsubscribePhase = useStore.subscribe(
			(state) => state.phase,
			(value, oldValue) => {
				if (value === oldValue) return;
				console.log(`phase change from ${oldValue} to ${value}`);
				const forward = (oldValue ?? 0) < value;

				EventChannel.emit('cameraMotion_A', forward);

				switch (value) {
					case 0:
						EventChannel.emit('queuingSwitches_A', false);
						break;
					case 1:
						if (forward) {
							EventChannel.emit('queuingSwitches_A', true);
						} else {
							EventChannel.emit('showTopCase_A', false);
						}
						break;
					case 2:
						if (forward) {
							EventChannel.emit('showTopCase_A', true);
						} else {
							EventChannel.emit('expandKeyboard_A', false);
						}
						break;
					case 3:
						EventChannel.emit('expandKeyboard_A', true);
						break;
					default:
						break;
				}
			}
		);

		return () => {
			unsubscribePhase();
		};
	}, []);

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

				{/* <OrbitControls makeDefault /> */}

				{/* <ambientLight /> */}
				{/* <directionalLight castShadow /> */}

				{/* <Environment preset='sunset' /> */}

				<ScrollControls pages={3}>
					<Scene />
				</ScrollControls>
			</Canvas>

			{/* <div className='tempBtnList'>
				<button
					className='tempBtn'
					onClick={nextPhase}
				>
					nextPhase
				</button>
				<button
					className='tempBtn'
					onClick={prevPhase}
				>
					prevPhase
				</button>
			</div> */}
		</>
	);
}
