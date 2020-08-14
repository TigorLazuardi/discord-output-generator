if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

import Discord from 'discord.js'
import { handlePython } from './handle_python'
import { handleJavascript } from './handle_javascript'

const bot = new Discord.Client()

const token = process.env.BOT_TOKEN

bot.on('ready', () => {
  console.log('Bot is up and ready')
})

bot.on('message', async (message) => {
  // Ignore bots
  if (message.author.bot) {
    return
  }
  let reply = 'unhandled switch case in the server'
  try {
    switch (true) {
      // Don't handle quotes
      case message.content.startsWith('> '):
        return
      case message.content.includes('```python'):
        reply = await handlePython(message.content)
        break
      case message.content.includes('```javascript'):
        reply = await handleJavascript(message.content)
        break
      default:
        return
    }
  } catch (e) {
    reply = e.message || 'Something happened in the server'
  }
  if (!reply) {
    reply = 'Code does not print any result'
  }
  message.channel.send(`<@${message.author.id}> \`\`\`${reply.trim()}\`\`\``)
})

bot.on('error', (err) => {
  console.error(err)
})

bot.login(token).catch((err) => {
  console.error('=================> Failed to login')
  console.error(err)
  process.exit(1)
})
