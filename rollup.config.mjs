import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.ts',
  output: [{
    file: 'dist/cjs/index.js',
    // dir: 'dist',
    format: 'cjs'
  }, {
    file: 'dist/esm/index.js',
    format: 'esm'
  }],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json'
      // declarationDir: 'dist'
    }),
    postcss({
      extract: 'index.css',
      modals: true,
      use: ['sass'],
      minimize: true
    }),
    terser()
  ],
  external: ['react']
}
