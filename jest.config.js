const config = {
  testEnvironment: "jsdom",

  testMatch: ["**/*.test.js", "**/*.test.ts", "**/*.test.tsx"],

  testPathIgnorePatterns: ["<rootDir>/node_modules/"],

  // コンパイル対象外のフォルダーを指定
  transformIgnorePatterns: ["/node_modules/"],

  transform: {
    ".+\\.tsx?$": [
      "@swc/jest",
      {
        sourceMaps: true,
        module: {
          type: "commonjs",
        },
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: true,
          },
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    ],
  },
};

module.exports = config;
