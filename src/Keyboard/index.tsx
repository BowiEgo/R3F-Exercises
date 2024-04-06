import { Canvas } from '@react-three/fiber';
import { Scene } from './Scene';
import { OrbitControls } from '@react-three/drei';
import { useControls } from 'leva';
import { mapEventChannel } from './event';
import { useEffect, useState } from 'react';
import { usePrevious } from '../hooks';

export default function LivingRoom() {
	const { bgColor } = useControls({
		bgColor: '#fff',
	});

	const [stage, setStage] = useState(0);
	const oldStage = usePrevious(stage);

	const nextStage = () => {
		if (stage < 3) setStage(stage + 1);
	};
	const prevStage = () => {
		if (stage > 0) setStage(stage - 1);
	};

	useEffect(() => {
		const forward = (oldStage ?? 0) < stage;

		switch (stage) {
			case 0:
				mapEventChannel.emit('queuingSwitches_A', false);
				break;
			case 1:
				if (forward) {
					mapEventChannel.emit('queuingSwitches_A', true);
				} else {
					mapEventChannel.emit('showTopCase_A', false);
				}
				break;
			case 2:
				if (forward) {
					mapEventChannel.emit('showTopCase_A', true);
				} else {
					mapEventChannel.emit('expandKeyboard_A', false);
				}
				break;
			case 3:
				mapEventChannel.emit('expandKeyboard_A', true);
				break;
			default:
				break;
		}
	}, [stage]);

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
					onClick={nextStage}
				>
					nextStage
				</button>
				<button
					className='tempBtn'
					onClick={prevStage}
				>
					prevStage
				</button>
			</div>
		</>
	);
}
