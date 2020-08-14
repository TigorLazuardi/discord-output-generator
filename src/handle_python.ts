import fs from 'fs-extra'
import run from './run_command'
import genRandom from './gen_random'

const basePath = './run'

export async function handlePython(content: string): Promise<string> {
  let result = ''
  const code = content.split('```python\n').pop()?.split('```')[0]

  if (!code) throw new Error('Empty code')

  const fileName = genRandom()

  const path = `${basePath}/${fileName}.py`

  await fs.writeFile(path, code)

  try {
    result = await run(3000, 'python3', path)
  } catch (e) {
    result = e.message || 'Failed to run python'
  } finally {
    await fs.unlink(path)
  }
  return result
}
