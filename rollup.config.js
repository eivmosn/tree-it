import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import { dts } from 'rollup-plugin-dts'

export default [
  {
    input: 'src/index.ts',
    plugins: [
      nodeResolve(),
      typescript(),
    ],
    output: {
      file: 'dist/index.mjs',
      format: 'esm',
    },
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'esm',
    },
    plugins: [
      dts({
        respectExternal: true,
      }),
    ],
  },
]
