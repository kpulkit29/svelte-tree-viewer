module.exports = {
    transform: {
      "^.+\\.svelte$": "jest-transform-svelte",
      "^.+\\.js$": "babel-jest"
    },
    moduleFileExtensions: ["js", "svelte"],
    testEnvironment: "jsdom",
    testPathIgnorePatterns: ["node_modules"],
    bail: false,
    verbose: true,
    transformIgnorePatterns: [],
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"]
  };