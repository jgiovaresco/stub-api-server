module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!src/**/__tests__/**',
    '!src/**/*.d.ts',
    '!test/**/*.ts',
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts', 'jest-extended/all'],
  testMatch: [
    '<rootDir>/src/**/*.test.ts',
    '<rootDir>/test/**/*.acceptance.ts',
    '<rootDir>/examples/**/*.acceptance.ts',
  ],
};
