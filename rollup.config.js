import pkg from './package.json';
import typescriptPlugin from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const allBuilds = {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true
    },
    {
      file: pkg['main-esm'],
      format: 'es',
      sourcemap: true
    }
  ],
  external: [...Object.keys(pkg.dependencies || {})],
  plugins: [
    typescriptPlugin(),
    terser(),

    // Needed to resolve `Event` class from Ethers in AlchemyWebSocketProvider
    nodeResolve({ preferBuiltins: true }),
    commonjs()
  ]
};

export default allBuilds;
