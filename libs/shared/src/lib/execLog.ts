import util from 'util'
import { exec as exec0 } from 'child_process'

const exec = util.promisify(exec0)
export const execLog = async (command: string) => {
    try {
        const { stdout, stderr } = await exec(command)
        if (stderr) {
            console.log(`stderr: ${stderr}`)
            return
        }
        console.log(`stdout: ${stdout}`)
    } catch (error) {
        console.log(`error: ${error.message}`)
        return
    }
}
