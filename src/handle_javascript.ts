import fs from 'fs-extra'
import run from './run_command'
import genRandom from './gen_random'

if (!fs.existsSync('run')) {
  fs.mkdirSync('run')
}

const basePath = './run'

export async function handleJavascript(content: string): Promise<string> {
  let result = ''
  const code = content.split('```javascript\n').pop()?.split('```')[0]

  if (!code) throw new Error('Empty code')

  const fileName = genRandom()

  const path = `${basePath}/${fileName}.js`

  await fs.writeFile(path, code)

  try {
    result = await run(3000, 'node', path)
  } catch (e) {
    result = e.message || 'Failed to run python'
  } finally {
    await fs.unlink(path)
  }
  return result
}
