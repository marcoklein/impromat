module.exports = {
  ignorePatterns: ["**/*.gen.ts"],
  extends: ["react-app"],
  overrides: [
    {
      files: ["test/**/*.ts", "src/**/*.test.ts", "src/**/*.test.tsx"],
      parserOptions: {
        project: [
          "./tsconfig.test.json",
          "packages/impromat/tsconfig.storybook.json",
        ],
      },
      rules: {
        "@typescript-eslint/no-floating-promises": "error",
      },
    },
  ],
};
