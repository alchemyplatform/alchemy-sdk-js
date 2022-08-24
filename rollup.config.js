import pkg from './package.json';
import typescriptPlugin from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const isExternalModule = (() => {
  const deps = new Set(Object.keys(pkg.dependencies));
  return id => (id.startsWith('.') && id.endsWith('/utils')) || deps.has(id);
})();

function makeConfig(input, output) {
  return {
    input,
    output: [
      {
        dir: `dist/cjs/${output}`,
        format: 'cjs',
        sourcemap: true
      },
      {
        dir: `dist/esm/${output}`,
        format: 'esm',
        sourcemap: true
      },
      {
        dir: `dist/es/${output}`,
        format: 'es',
        sourcemap: true
      }
    ],
    external: isExternalModule,
    plugins: [typescriptPlugin(), nodeResolve(), commonjs()]
  };
}

export default [
  makeConfig('src/index.ts', ''),
  makeConfig('src/api/utils.ts', 'api/')
];
