module.exports = {
    preset: 'jest-preset-angular',
    collectCoverage: true,
    coverageDirectory: '<rootDir>coverage/apps/auth',
    coverageReporters: ['lcov', 'html', 'text', 'text-summary'],
    moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
    globalSetup: 'jest-preset-angular/global-setup',
    modulePathIgnorePatterns: ['<rootDir>/dist'],
    coveragePathIgnorePatterns: [
      "node_modules",
      "test-config",
      "interfaces",
      "jestGlobalMocks.ts",
      ".module.ts",
      ".mock.ts",
      "<rootDir>/libs/commons-lib",
    ],
    moduleNameMapper: {
      '^commons-lib': '<rootDir>/libs/commons-lib/src/public-api.ts',
      "uuid": require.resolve('uuid')
    }
};