import { useState, useTransition } from 'react';
import { Environment } from '@react-three/drei';
import { useControls } from 'leva';

type envPreset =
	| 'dawn'
	| 'sunset'
	| 'night'
	| 'warehouse'
	| 'forest'
	| 'apartment'
	| 'studio'
	| 'city'
	| 'park'
	| 'lobby'
	| undefined;

export function Env() {
	const [preset, setPreset] = useState('dawn');
	const [_inTransition, startTransition] = useTransition();
	const { blur } = useControls({
		blur: { value: 0.65, min: 0, max: 1 },
		preset: {
			value: preset,
			options: [
				'sunset',
				'dawn',
				'night',
				'warehouse',
				'forest',
				'apartment',
				'studio',
				'city',
				'park',
				'lobby',
			],
			onChange: (value) => startTransition(() => setPreset(value)),
		},
	});

	return (
		<Environment
			preset={preset as envPreset}
			background
			blur={blur}
		/>
	);
}
