import type { Config } from "jest";

const config: Config = {
  moduleFileExtensions: ["js", "json", "ts"],
  moduleDirectories: ["../../node_modules", "node_modules", "<rootDir>"],
  rootDir: ".",
  roots: ["src"],
  testRegex: ".*\\.test\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
  reporters: ["default", ["jest-junit", { outputName: "junit-results.xml" }]],
  testTimeout: 10000,
};

export default config;
