module.exports = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleFileExtensions: [
    'js',
    'mjs',
    'cjs',
    'jsx',
    'ts',
    'tsx',
    'json',
    'node',
  ],
  collectCoverage: true,
  collectCoverageFrom: ['./src/**'],
  coveragePathIgnorePatterns: [
    '/src/server.js',
  ],
  reporters: [
    'default',
    [
      'jest-sonar',
      {
        outputDirectory: 'coverage/',
        outputName: 'jest-report.xml',
        reportedFilePath: 'relative',
        relativeRootDir: '<rootDir>/../',
      },
    ],
  ],
  testMatch: [
    '**/*.test.js',
  ],
};
