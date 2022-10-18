module.exports = {
    preset: 'jest-preset-angular',
    collectCoverage: true,
    coverageDirectory: '<rootDir>coverage/apps/shell',
    coverageReporters: ['lcov', 'html', 'text', 'text-summary'],
    moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
    globalSetup: 'jest-preset-angular/global-setup',
    modulePathIgnorePatterns: ['<rootDir>/dist'],
    moduleNameMapper: {
      'commons-lib': '<rootDir>/dist/commons-lib/index.d.ts'
    }
};