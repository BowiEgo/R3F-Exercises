import * as THREE from 'three';
import gsap from 'gsap';
import { KeyCapMaterials } from './Keycaps';

// export function animations({
// 	IXPEFoam,
// 	PETFilm,
// 	bottomCase,
// }: {
// 	IXPEFoam: THREE.Mesh;
// 	PETFilm: THREE.Mesh;
// 	bottomCase: THREE.Group;
// }) {
// 	const master = gsap.timeline();

// 	master.add(surfacing({ IXPEFoam, PETFilm, bottomCase }));

// 	return master;
// }

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
		defaults: { duration: 1, ease: 'none', autoRemoveChildren: false },
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

	return tl.pause();
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
		defaults: { duration: 1, ease: 'none', autoRemoveChildren: false },
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

	return tl.pause();
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
		defaults: { duration: 1, ease: 'none', autoRemoveChildren: false },
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

	return tl.pause();
}
