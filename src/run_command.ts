import { exec } from 'child_process'

export default function run(timeout: number, ...command: string[]): Promise<string> {
  return new Promise((resolve, reject) => {
    const proc = exec(command.join(' '), (err, stdout, stderr) => {
      clearTimeout(kill)
      let result = ''
      if (err) {
        reject(err)
        return
      }
      if (stdout) {
        result += 'stdout:\n' + stdout + '\n'
      }
      if (stderr) {
        result += 'stderr:\n' + stderr + '\n'
      }
      resolve(result)
    })
    const kill = setTimeout(() => {
      proc.kill('SIGKILL')
      reject(new Error('Process timeout'))
    }, timeout)
  })
}
