module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/jsx-runtime",
    "plugin:prettier/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: [
    "@typescript-eslint",
    "deprecation",
    "import",
    "prettier",
    "unused-imports",
    "react",
  ],
  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/no-empty-interface": [
      "error",
      { allowSingleExtends: true },
    ],
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-non-null-assertion": "error",
    "unused-imports/no-unused-imports": "error",
    "@typescript-eslint/no-unnecessary-condition": "error",
    "react/prop-types": "off",
    "react/display-name": "off",
    "react/jsx-uses-react": "error",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "arrow-body-style": ["error", "as-needed"],
    "react-hooks/rules-of-hooks": "error",
    "import/newline-after-import": "error",
    "import/first": "error",
    "import/order": "error",
    'import/no-default-export': 'error',
    "newline-before-return": "error",
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: ["block-like", "class", "function"],
        next: "*",
      },
    ],
    "deprecation/deprecation": "warn",
    "no-restricted-imports": [
      "error",
      {
        paths: [
          "react-select", // use `chakra-react-select` instead
        ],
        patterns: [
          "platform/*/*", // We provide a clean interface for platform-specific code (import `platform`, `platform/auth`, `platform/telemtry`, etc.)
          "pages/*", // Don't reference pages from other pages. That indicates improper abstraction.
          "react-select/*", // use `chakra-react-select` instead
        ],
      },
    ],
    'func-style': ["error", "expression", { "allowArrowFunctions": true }]
  },
  ignorePatterns: [
    "node_modules",
    "build",
    "generated-endpoints.ts",
    ".eslintrc.*",
    "vite.config.ts",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
};
