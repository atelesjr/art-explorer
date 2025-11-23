import '@testing-library/jest-dom';

// Polyfill TextEncoder/TextDecoder for Jest environment (some libs expect these globals)
// Use `globalThis` and a runtime `require` with ts-ignore to avoid TypeScript/typing issues
if (typeof (globalThis as any).TextEncoder === 'undefined') {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	// @ts-ignore: require may not be typed in this TS configuration
	const util = require('util');
	(globalThis as any).TextEncoder = util.TextEncoder;
	(globalThis as any).TextDecoder = util.TextDecoder;
}
