import * as THREE from 'three';
import gsap from 'gsap';
import { KeyCapMaterials } from './Keycaps';

export function assembleBottomBody({
	plate,
	IXPEFoam,
	PETFilm,
	bottomCase,
}: {
	plate: THREE.Mesh;
	IXPEFoam: THREE.Mesh;
	PETFilm: THREE.Mesh;
	bottomCase: THREE.Group;
}) {
	const tl = gsap.timeline({
		paused: true,
		defaults: { duration: 1, ease: 'none' },
	});

	const materialTargets = [
		plate.material,
		IXPEFoam.material,
		PETFilm.material,
		...bottomCase.children.map((child) => {
			if (child instanceof THREE.Mesh) {
				return child.material;
			}
		}),
	];
	const positionTargets = [
		plate.position,
		IXPEFoam.position,
		PETFilm.position,
		bottomCase.position,
	];

	tl.fromTo(positionTargets, { y: -1 }, { y: 0, ease: 'power1.out' });
	tl.fromTo(materialTargets, { opacity: 0 }, { opacity: 1, ease: 'none' }, '<');

	return tl;
}

export function assembleTopBody({
	keycaps,
	keycapsMaterial,
	knob,
	knobHolder,
	topCase,
}: {
	keycaps: THREE.Group;
	keycapsMaterial: KeyCapMaterials;
	knob: THREE.Mesh;
	knobHolder: THREE.Mesh;
	topCase: THREE.Mesh;
}) {
	const tl = gsap.timeline({
		paused: true,
		defaults: { duration: 1, ease: 'none' },
	});

	const materialTargets = [
		keycapsMaterial.primary,
		keycapsMaterial.secondary,
		keycapsMaterial.tertiary,
		knob.material,
		knobHolder.material,
		topCase.material,
	];
	const positionTargets = [
		keycaps.position,
		knob.position,
		knobHolder.position,
		topCase.position,
	];

	tl.fromTo(positionTargets, { y: 1 }, { y: 0, ease: 'back.inOut' });
	tl.fromTo(materialTargets, { opacity: 0 }, { opacity: 1, ease: 'none' }, '<');

	return tl;
}

export function expandWholeBody({
	keycaps,
	switches,
	knob,
	knobHolder,
	topCase,
	plate,
	IXPEFoam,
	PETFilm,
	bottomCase,
}: {
	keycaps: THREE.Group;
	switches: THREE.Group;
	knob: THREE.Mesh;
	knobHolder: THREE.Mesh;
	topCase: THREE.Mesh;
	plate: THREE.Mesh;
	IXPEFoam: THREE.Mesh;
	PETFilm: THREE.Mesh;
	bottomCase: THREE.Group;
}) {
	const tl = gsap.timeline({
		paused: true,
		defaults: { duration: 1, ease: 'none' },
	});

	const positionTargets = [
		keycaps.position,
		switches.position,
		knob.position,
		knobHolder.position,
		topCase.position,
		plate.position,
		IXPEFoam.position,
		PETFilm.position,
		bottomCase.position,
	];

	tl.fromTo(
		positionTargets,
		{ y: 0 },
		{
			y: (index, _target, _targets) => {
				let idx = 0;

				if (index === 1) {
					idx = 1;
				} else if (index === 0 || index === 2 || index === 3) {
					idx = 2;
				} else {
					idx = -index + 4;
				}

				return idx * 0.5;
			},
			ease: 'back.inOut',
		}
	);

	return tl;
}

export function cameraAnimation({
	camera,
	cameraTarget,
}: {
	camera: THREE.Camera;
	cameraTarget: THREE.Vector3;
}) {
	const tl = gsap.timeline({
		paused: true,
		defaults: { duration: 0.5, ease: 'none' },
	});
	tl.to(camera.position, { x: -4, y: 3, z: 4, ease: 'sine.inOut', duration: 0.1 })
		.add('0')
		.to(camera.position, { x: 0, y: 3, z: 6.5, ease: 'sine.inOut' })
		.to(camera.position, {
			x: 0,
			y: 5,
			z: 2.5,
			ease: 'back.out',
			duration: 1.5,
		})
		.add('1')
		/* prettier-ignore */
		.to([camera.position, cameraTarget], {
			x: (index, _target, _targets) => {
				if (index === 0) {
					return -4;
				} else {
					return 1;
				}
			},
			y: (index, _target, _targets) => {
				if (index === 0) {
					return 2;
				} else {
					return -1;
				}
			},
			z: (index, _target, _targets) => {
				if (index === 0) {
					return 6;
				} else {
					return 0;
				}
			},
			ease: 'power1.in',
		})
		.add('2');

	return tl;
}
