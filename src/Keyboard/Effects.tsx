import { useThree } from '@react-three/fiber';
import { EffectComposer, Outline } from '@react-three/postprocessing';

export default function Effects() {
	const { size } = useThree();

	return (
		<EffectComposer autoClear={false}>
			{/* <DepthOfField
				focusDistance={0}
				focalLength={0.02}
				bokehScale={2}
				height={480}
			/> */}
			<Outline
				visibleEdgeColor={0xffffff}
				hiddenEdgeColor={0xffffff}
				blur
				width={size.width * 1.25}
				edgeStrength={10}
			/>
		</EffectComposer>
	);
}
