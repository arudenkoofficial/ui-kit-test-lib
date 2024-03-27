import * as fs from 'node:fs'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const pkg = require('../package.json')

const COMPONENTS_PATH = './lib'

const getPackageJsonContent = (componentName) => {
  return JSON.stringify(
    {
      name: `${pkg.name}/${componentName}`,
      version: pkg.version,
      main: '../index.cjs',
      module: './index.js',
      typings: './index.d.ts',
      peerDependencies: pkg.peerDependencies,
      dependencies: pkg.dependencies,
      resolutions: pkg.resolutions,
    },
    null,
    2
  )
}

fs.readdirSync(COMPONENTS_PATH, { withFileTypes: true }).forEach((item) => {
  if (item.isDirectory() && !item.name.startsWith('_')) {
    const fileName = `${COMPONENTS_PATH}/${item.name}/package.json`
    fs.writeFile(fileName, getPackageJsonContent(item.name), (err) => {
      if (err) throw err
      console.log(`${item.name} package.json created`)
    })
  }
})

const rootPackageName = `${COMPONENTS_PATH}/package.json`
fs.writeFile(rootPackageName, JSON.stringify({...pkg, files: undefined, main: "./index.cjs", module: "./index.js", typings: "./index.d.ts"}), (err) => {
  if (err) throw err
      console.log('root package.json created')
})
