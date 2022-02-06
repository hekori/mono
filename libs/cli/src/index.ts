export * from './lib/cli'
export * from './lib/execLog'

console.log('called cli', __dirname, process.cwd())

import { Command } from 'commander'
const program = new Command()
