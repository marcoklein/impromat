import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '^uuid$': require.resolve('uuid'),
  },
  moduleDirectories: ['../../node_modules', 'node_modules', '<rootDir>'],
  rootDir: '.',
  roots: ['src', 'test'],
  testRegex: '.*\\.test\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  reporters: ['default', ['jest-junit', { outputName: 'junit-results.xml' }]],
};

export default config;
