import postcss from 'rollup-plugin-postcss'
import modules from 'postcss-modules'
import autoprefixer from 'autoprefixer'
import postcssImport from 'postcss-import'

export const getPostCss = (include = null, extract = false, inject = false) =>
  postcss({
    minimize: true,
    inject,
    include,
    extract,
    plugins: [
      modules({
        generateScopedName: (name) => {
          return `tele2-ui-kit__${name}`
        },
      }),
      autoprefixer(),
      postcssImport(),
    ],
    use: ['sass'],
    autoModules: false,
  })
