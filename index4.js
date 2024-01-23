import {Client, GatewayIntentBits} from 'discord.js'
import ytdl from 'ytdl-core';


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ],
})

client.on('ready', () => {
    console.log(`Bot de musica ${client.user.tag}`)
})

client.on('messageCreate', async (message) => {
    if(message.author.bot) return;

    if(message.content.startsWith('/play')) {
        const voiceChannel = message.member.voice.channel

        if(!voiceChannel){
            return message.replay('É necessário que você esteja em um canal de voz')
        }

        try {
            if (voiceChannel.type === 'GUILD_VOICE') {
                const connection = await voiceChannel.join()
                const args = message.content.split(' ')
                args.shift()
                const url = args[0]

                const stream = ytdl(url, {filter: 'audioonly'})
                const dispatcher = connection.play(stream)

                dispatcher.on('finish', () => {
                voiceChannel.leave()
                })

                dispatcher.on('error', (err) => {
                    console.log(err)
                    voiceChannel.leave()
                })
            } else {
                console.error('O canal não é um canal de voz válido.')
            }
        } catch (error) {
            console.error('Erro ao tentar entrar no canal de voz:', error);
        }
    }
})

client.login('MTE5ODk5NzIzMTkyNDE3MDk0Mw.G1XDal.1O2iP1A5ycRrZcLXcx1Lmh28lk1Gws4Fehxr_0')