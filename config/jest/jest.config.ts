import type {Config} from 'jest';
import path from 'path';

const config: Config = {
  globals: {
    '__IS_DEV__': true,
    '__API__': '',
    '__PROJECT__': 'jest'
  },

  modulePaths: [
    '<rootDir>src',
  ],
  setupFilesAfterEnv: ['<rootDir>config/jest/setupTests.ts'],
  moduleNameMapper: {
    // "^src/(.*)": "<rootDir>/../src/$1",
    '\\.svg': path.resolve(__dirname, 'jestEmptyComponent.tsx'),
    '\\.(scss|less)$': 'identity-obj-proxy',
    "^@/(.*)$": "<rootDir>/src/$1"
  },

  // transform: {
  //   "^.+\\.tsx?$": "ts-jest",
  //   ".+\\.(css|scss)$": "jest-css-modules-transform"
  // },

  coveragePathIgnorePatterns: [
    '\\\\node_modules\\\\',
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

  rootDir: "../../",

  testEnvironment: "jsdom",

  testMatch: [
    '<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)',
  ],

  reporters: [
    "default",
    ["jest-html-reporters", {
      "publicPath": "<rootDir>/reports/unit",
      "filename": "report.html",
      // "openReport": true,
      "inlineSource": true
    }]
  ]
};

export default config;