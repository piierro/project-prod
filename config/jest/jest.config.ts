import type {Config} from 'jest';
import path from 'path';

const config: Config = {
  globals: {
    '__IS_DEV__': true,
    '__API__': ''
  },

  modulePaths: [
    '<rootDir>src',
  ],
  setupFilesAfterEnv: ['<rootDir>config/jest/setupTests.ts'],
  moduleNameMapper: {
    '\\.svg': path.resolve(__dirname, 'jestEmptyComponent.tsx'),
    '\\.(scss|less)$': 'identity-obj-proxy',
  },

  // transform: {
  //   "^.+\\.tsx?$": "ts-jest",
  //   ".+\\.(css|scss)$": "jest-css-modules-transform"
  // },

  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],

  moduleDirectories: [
    "node_modules"
  ],

  moduleFileExtensions: [
    "js",
    "mjs",
    "cjs",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node"
  ],

  rootDir: "../..",

  testEnvironment: "jsdom",

  testMatch: [
    '<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)',
  ],
};

export default config;