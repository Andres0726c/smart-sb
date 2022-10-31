module.exports = {
    preset: 'jest-preset-angular',
    collectCoverage: true,
    coverageDirectory: '<rootDir>coverage/libs/commons-lib',
    coverageReporters: ['lcov', 'html', 'text', 'text-summary'],
    moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
    globalSetup: 'jest-preset-angular/global-setup',
    modulePathIgnorePatterns: ['<rootDir>/dist'],
    coveragePathIgnorePatterns: [
      'node_modules',
      'test-config',
      'interfaces',
      'jestGlobalMocks.ts',
      ".html",
      '.module.ts',
      '.mock.ts',
      '<rootDir>/projects/auth',
      '<rootDir>/projects/policy-management'
    ],
    moduleNameMapper: {
      '^commons-lib': '<rootDir>/libs/commons-lib/src/public-api.ts',
      '^projects/(.*)$': "<rootDir>/projects/$1",
      "uuid": require.resolve('uuid')
    },
};