// const path = require('path')

module.exports = {
  extends: "airbnb",
  rules: {
    "no-console": 1,
    "no-unused-vars": 1,
    "no-alert": 0,
    "object-curly-newline": ["error", { "multiline": true }],
    "import/no-extraneous-dependencies": 1,
    "import/prefer-default-export": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "react/prop-types": 0,
    "react/destructuring-assignment": 0,
    "import/no-named-as-default": 1,
    "object-property-newline": ["error"]
    // "react/button-has-type": 0
    // "no-undef": 0,
  },
  settings: {
    // Used to resolve absolute import
    "import/resolver": {
      node: {
        paths: ["."],
        // paths: [path.resolve(__dirname, "")],
      },
    },
  },
};
