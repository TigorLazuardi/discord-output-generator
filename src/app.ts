if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

import Discord from 'discord.js'

const bot = new Discord.Client()

const token = process.env.BOT_TOKEN

bot.on('ready', () => {
  console.log('Bot is up and ready')
})

bot.on('message', (message) => {
  console.log(message)
  if (message.author.bot) {
    return
  }
  message.channel.send(message.content)
})

bot.login(token).catch((err) => {
  console.error('=================> Failed to login')
  console.error(err)
  process.exit(1)
})
