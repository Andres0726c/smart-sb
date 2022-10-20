module.exports = {
    preset: 'jest-preset-angular',
    collectCoverage: true,
    coverageDirectory: '<rootDir>coverage/apps/policy-management',
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
      "<rootDir>/projects/commons-lib",
    ],
    moduleNameMapper: {
      '^commons-lib': '<rootDir>/projects/commons-lib/src/public-api.ts',
      '^projects/(.*)$': "<rootDir>/projects/$1",
      "uuid": require.resolve('uuid')
    }
};