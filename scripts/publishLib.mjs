
import {execSync} from 'child_process'

execSync(
    `cp .npmrc ./lib && cd ./lib && npm publish`, () => {
    console.log( 123)
    }
)

