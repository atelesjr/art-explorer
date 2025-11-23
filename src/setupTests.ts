import '@testing-library/jest-dom';

// Polyfill TextEncoder/TextDecoder for Jest environment (some libs expect these globals)
// Implement lightweight polyfills that use Node's Buffer so we avoid require/import and any casts.
if (typeof (globalThis as unknown as { TextEncoder?: unknown }).TextEncoder === 'undefined') {
	// Lightweight UTF-8 encode/decode that doesn't rely on Node's Buffer or external libs
	const utf8Encode = (str: string): Uint8Array => {
		const encoded = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_match, p1) => {
			return String.fromCharCode(parseInt(p1, 16));
		});
		const arr = new Uint8Array(encoded.length);
		for (let i = 0; i < encoded.length; i += 1) arr[i] = encoded.charCodeAt(i);
		return arr;
	};

	const utf8Decode = (data: Uint8Array): string => {
		let s = '';
		for (let i = 0; i < data.length; i += 1) s += String.fromCharCode(data[i]);
		try {
			return decodeURIComponent(s.split('').map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, '0')}`).join(''));
		} catch {
			return s;
		}
	};

	class PolyTextEncoder {
		encode(input = ''): Uint8Array {
			return utf8Encode(String(input));
		}
	}

	class PolyTextDecoder {
		decode(input?: ArrayBuffer | ArrayBufferView, options?: TextDecoderOptions): string {
			if (!input) return '';
			const uint8 = input instanceof Uint8Array ? input : new Uint8Array(input as ArrayBuffer);
			// reference options to satisfy lint rules when it's unused in this polyfill
			void options;
			return utf8Decode(uint8);
		}
	}

	(globalThis as unknown as { TextEncoder?: new () => TextEncoder }).TextEncoder =
		PolyTextEncoder as unknown as new () => TextEncoder;
	(globalThis as unknown as { TextDecoder?: new () => TextDecoder }).TextDecoder =
		PolyTextDecoder as unknown as new () => TextDecoder;
}
