import { EffectComposer, SSR } from '@react-three/postprocessing';

export function Effects() {
	const ssrOpts = {
		intensity: 1,
		exponent: 1,
		distance: 10,
		fade: 0,
		roughnessFade: 1,
		thickness: 10,
		ior: 1.45,
		maxRoughness: 1,
		maxDepthDifference: 10,
		blend: 0.9,
		correction: 1,
		correctionRadius: 1,
		blur: 0.5,
		blurKernel: 1,
		blurSharpness: 10,
		jitter: 0,
		jitterRoughness: 0,
		steps: 20,
		refineSteps: 5,
		missedRays: true,
		useNormalMap: true,
		useRoughnessMap: true,
		resolutionScale: 1,
		velocityResolutionScale: 1,
	};
	return <EffectComposer disableNormalPass>{<SSR {...ssrOpts} />}</EffectComposer>;
}
