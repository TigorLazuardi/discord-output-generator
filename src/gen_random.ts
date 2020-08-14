import crypto from 'crypto'

export default function genRandom(): string {
  return crypto.randomBytes(20).toString('hex')
}
