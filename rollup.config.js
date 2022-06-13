import pkg from './package.json';
import typescriptPlugin from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

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
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    '@ethersproject/providers/lib/base-provider'
  ],
  plugins: [typescriptPlugin(), terser()]
};

export default allBuilds;
