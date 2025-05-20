// .eslintrc.js
module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    // Customize rules here
    "no-unused-vars": "warn",
    "no-console": "off",
  },

  overrides: [
    {
      files: ["src/admin/app.example.js"],
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module", // <-- override for this file
      },
    },
  ],
};
