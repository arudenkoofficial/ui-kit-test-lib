import fs from 'fs'
import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { rollup } from 'rollup'
import { getPostCss } from '../utils/getPostCssPlugin.mjs'

export const getFiles = (entry, extensions = [], excludeExtensions = []) => {
  let fileNames = []
  const dirs = fs.readdirSync(entry)

  dirs.forEach((dir) => {
    const path = `${entry}/${dir}`

    if (fs.lstatSync(path).isDirectory()) {
      fileNames = [
        ...fileNames,
        ...getFiles(path, extensions, excludeExtensions),
      ]

      return
    }

    if (
      !excludeExtensions.some((exclude) => dir.endsWith(exclude)) &&
      extensions.some((ext) => dir.endsWith(ext))
    ) {
      fileNames.push(path)
    }
  })

  return fileNames
}

rollup({
  input: getFiles('src', ['index.ts']),
  plugins: [json(), nodeResolve(), commonjs(), typescript(), getPostCss()],
})
