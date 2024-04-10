import { useMemo } from 'react';
import useStore from './store';

export function IntroMask() {
	const { progress } = useStore();

	const typeNameTop = useMemo(() => {
		return -(10 * progress) - 2;
	}, [progress]);

	const top = useMemo(() => {
		return -(20 * progress + 2);
	}, [progress]);

	const bottom = useMemo(() => {
		return 30 * progress + 2;
	}, [progress]);

	const left = useMemo(() => {
		return 10 * progress + 2;
	}, [progress]);

	return (
		<div className='mask'>
			<div className='intro-mask'>
				<div
					className='mask-top'
					style={{ transform: `translateY(${top}vh)` }}
				></div>
				<div
					className='mask-bottom'
					style={{ transform: `translateY(${bottom}vh)` }}
				></div>
				<div
					className='mask-left'
					style={{ transform: `translateX(${-left}vw)` }}
				></div>
				<div
					className='mask-right'
					style={{ transform: `translateX(${left}vw)` }}
				></div>
			</div>

			<div
				className='type-name'
				style={{ transform: `translateY(${typeNameTop}vh)` }}
			>
				Q1 Max
				<div
					className='type-name-bar'
					style={{ transform: `scale3d(${progress}, 1, 1)` }}
				></div>
			</div>

			<div
				className='brand-name'
				style={{ transform: `translateY(${bottom}vh)` }}
			>
				KEYCHRON
			</div>
		</div>
	);
}
