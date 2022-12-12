import basicConfig, { name, file } from './rollup.config.js'
export default {
  ...basicConfig,
  output: {
    name,
    file: file('esm'),
    format: 'es'
  }
}