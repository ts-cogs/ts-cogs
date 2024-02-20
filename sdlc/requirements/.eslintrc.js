/** @type {import("eslint").Linter.Config} */
module.exports = {
    root: true,
    extends: ["@ts-cogs/eslint-config/api-style.js"],
    parserOptions: {
      project: "./tsconfig.json",
    },
  };
