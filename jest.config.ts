export default {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
		//'^/vite\\.svg$': '<rootDir>/src/__mocks__/fileMock.js',
		'\\.(svg)$': '<rootDir>/src/__mocks__/fileMock.js',
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	moduleDirectories: ['node_modules', 'src'],
	testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
};
// export default {
// 	preset: 'ts-jest',
// 	testEnvironment: 'jsdom',
// 	setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
// 	moduleNameMapper: {
// 		'^@/(.*)$': '<rootDir>/src/$1',
// 		'\\.(svg)$': '<rootDir>/src/__mocks__/fileMock.js',
// 		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
// 	},
// 	moduleDirectories: ['node_modules', 'src'],
// 	testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
// 	transform: {
// 		'^.+\\.(ts|tsx)$': 'ts-jest',
// 	},
// };
