export function determineNumLength(num: number | string, pad: string) {
	let str = '' + num;
	return pad.substring(0, pad.length - str.length) + str;
}
