const randomVector = (r: number) => [
	r / 2 - Math.random() * r,
	r / 2 - Math.random() * r,
	r / 2 - Math.random() * r,
];
const randomEuler = () => [
	Math.random() * Math.PI,
	Math.random() * Math.PI,
	Math.random() * Math.PI,
];
const data = Array.from({ length: 81 }, (r: number = 10) => ({
	random: Math.random(),
	position: randomVector(r),
	rotation: randomEuler(),
}));

const switchData = [
	{ position: [0, 0, 0] },
	{ position: [1, 0, 0] },
	{ position: [2, 0, 0] },
	{ position: [3, 0, 0] },
];

export { data, switchData };
