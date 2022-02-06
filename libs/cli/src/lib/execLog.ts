import * as util from 'util'
import { exec as exec0 } from 'child_process'

const exec = util.promisify(exec0)

interface ExecLogReturnValue {
  stdout?: string
  stderr?: string
}

export const execLog = async (command: string): Promise<ExecLogReturnValue> => {
  const { stdout, stderr } = await exec(command)
  if (stderr) {
    console.log(`stderr: ${stderr}`)
  }
  console.log(`stdout: ${stdout}`)
  return { stdout, stderr }
}

export default execLog
