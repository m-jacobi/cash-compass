// jest.config.js
module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    globalSetup: 'jest-preset-angular/global-setup',
    modulePathIgnorePatterns: ['<rootDir>/e2e/'],
    collectCoverageFrom: [
        "src/**/*.ts",
        "!src/**/*.spec.ts",
        "!src/**/*.action.ts",
        "!src/**/*.type.ts",
        "!src/test/*.ts",
        "!src/environments/**/*.ts",
        "!**/node_modules/**",
        "!**/vendor/**",
    ],
    collectCoverage: true,
    coverageReporters: [
        "json",
        "text",
        "lcov",
        "clover",
    ],
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "/main\.ts",
        "/polyfills\.ts",
        "/*.\.module\.ts",
        "/*.\.mock\.ts",
        "/*.\.enum\.ts",
        "/*.\.directive\.ts",
        "/*.\.view\.component\.ts",
        "/*.\.action\.ts",
    ],
    coverageDirectory: './doc/test/coverage',
    coverageThreshold: {
        global: {
            branches: 25,
            functions: 51,
            lines: 51,
            statements: 52
        }
    }
};
