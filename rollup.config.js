import pkg from './package.json';
import typescriptPlugin from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const allBuilds = {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist/cjs',
      format: 'cjs',
      sourcemap: true
    },
    {
      dir: 'dist/esm',
      format: 'esm',
      sourcemap: true
    },
    {
      dir: 'dist/es',
      format: 'es',
      sourcemap: true
    }
  ],
  external: [...Object.keys(pkg.dependencies || {})],
  plugins: [typescriptPlugin(), nodeResolve(), commonjs()]
};

export default allBuilds;
