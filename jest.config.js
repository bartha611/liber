module.exports = {
  clearMocks: true,
  collectCoverageFrom: ["client/**/*.{js,jsx}"],
  coverageDirectory: "coverage",
  moduleFileExtensions: ["js", "json", "jsx"],
  setupFiles: ["<rootDir>/enzyme.config.js"],
  testMatch: ["**/__tests__/**/*.js?(x)"],
  testPathIgnorePatterns: ["\\\\node_modules\\\\"],
};
