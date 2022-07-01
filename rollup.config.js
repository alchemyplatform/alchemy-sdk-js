import pkg from './package.json';
import typescriptPlugin from 'rollup-plugin-typescript2';
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
      file: pkg['main-es'],
      format: 'es',
      sourcemap: true
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),

    // Needed for '/lib' import in AlchemyWebSocketProvider
    '@ethersproject/providers/lib/base-provider'
  ],
  plugins: [
    typescriptPlugin(),

    // Needed to resolve `Event` class from Ethers in AlchemyWebSocketProvider
    nodeResolve(),
    commonjs()
  ]
};

export default allBuilds;
