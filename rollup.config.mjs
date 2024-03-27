import fs from 'fs'
import typescript from 'rollup-plugin-typescript2'
import image from '@rollup/plugin-image'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import svgr from '@svgr/rollup'
import json from '@rollup/plugin-json'
import sizes from 'rollup-plugin-sizes'
import alias from '@rollup/plugin-alias';
import { getFiles } from './scripts/buildUtils.mjs'
import { getPostCss } from './utils/getPostCssPlugin.mjs'

const pkg = require('./package.json')

const extensions = ['.js', '.ts', '.jsx', '.tsx']
const excludeExtensions = [
  'test.js',
  'test.ts',
  'test.jsx',
  'test.tsx',
  'stories.js',
  'stories.ts',
  'stories.jsx',
  'stories.tsx',
  'd.ts'
]

const getSassBuildPlugins = (source, plugins = [], withoutExtract = false) =>
  fs.readdirSync(source, { withFileTypes: true }).reduce((acc, dirent) => {
    if (dirent.isDirectory()) {
      const path = `${source}/${dirent.name}`
      const stylesSrcModule = `${path}/styles.module.scss`

      if (fs.existsSync(stylesSrcModule)) {
        acc.push(
          getPostCss(
            stylesSrcModule,
            withoutExtract ? null : `${path.split('src/')[1]}/styles.css`
          )
        )
      }

      getSassBuildPlugins(path, acc, true)
    }

    return acc
  }, plugins)

const external = [
  ...Object.keys(pkg.devDependencies),
  ...Object.keys(pkg.peerDependencies)
]

const ALIAS_COMPONENT_ENTRIES = [
  { find: '../Button', replacement: 'tele2-ui-kit/Button' },
]

const plugins = [
  json(),
  nodeResolve(),
  commonjs(),
  typescript({
    tsconfigOverride: {
      compilerOptions: {
        declaration: true,
        declarationDir: 'lib'
      },
      exclude: [
        'lib',
        'src/_internal/__mocks__',
        'src/**/*.test.ts',
        'src/**/*.test.tsx',
        'src/**/*.stories.ts',
        'src/**/*.stories.tsx',
        'src/**/*.stories.tsx'
      ]
    }
  }),
  image(),
  svgr(),
  ...getSassBuildPlugins('src', [
    getPostCss('./src/styles.module.scss', 'styles.css', true)
  ]),
  sizes(),
  alias(ALIAS_COMPONENT_ENTRIES)
]

export default [
  {
    input: ['src/index.ts'],
    output: [
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
        exports: 'named',
        banner: "'use client';"
      },
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
        banner: "'use client';"
      }
    ],
    plugins,
    external
  },
  {
    input: getFiles('src', extensions, excludeExtensions),
    output: {
      dir: 'lib',
      format: 'esm',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: false,
      banner: "'use client';",
      globals: {
        react: 'React'
      }
    },
    plugins,
    external
  }
]
