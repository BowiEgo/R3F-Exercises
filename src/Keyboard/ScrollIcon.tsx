import { useMemo } from 'react';
import useStore from './store';

export function ScrollIcon() {
	const { progress } = useStore();

	const right = useMemo(() => {
		return 10 * progress;
	}, [progress]);

	return (
		<div
			className='scroll-icon'
			style={{ transform: `translateX(${right}vw)` }}
		>
			<div className='ball-scroll'></div>
		</div>
	);
}
