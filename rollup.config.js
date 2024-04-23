const typescript = require('@rollup/plugin-typescript');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');

module.exports = {
  input: 'src/main.ts',  // Path to your main TypeScript file
  output: {
    file: 'dist/grocy.js',  // Output file as used in your package.json
    format: 'cjs'  // CommonJS, suitable for Node.js
  },
  plugins: [
    resolve(),  // Helps Rollup understand node modules
    commonjs(), // Convert CommonJS modules to ES6
    json(),
    typescript() // TypeScript plugin to compile TS to JS
  ],
  external: ['node-red']  // Treat 'node-red' as an external dependency
};
