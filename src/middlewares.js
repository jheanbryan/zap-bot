const { isCommand, extractDataMessage } = require('../src/utils/index');
const { BOT_EMOJI } = require('./config');
const Actions = require('./actions/index');
const { menu, repo } = require('../src/utils/menu');


async function middlewares(bot){
    bot.ev.on('messages.upsert', async ({ messages, type }) => {
        console.log('Olha a mensagem\n');
        console.log(messages);

        const baileysMessage = messages[0]; //pegar apenas a mensagem
        
        if(!baileysMessage?.message || !isCommand(baileysMessage)){
            return
        }

        const actions = new Actions(bot, baileysMessage);

        const { command, remoteJid } = extractDataMessage(baileysMessage)

        switch (command.toLowerCase()) {
            case 'menu':
                await bot.sendMessage(remoteJid, {text: `${menu}`});
                break
            case 's':
                console.log('\n figurinhaaaa')
                await actions.sticker();
                break;
            case 'ping':
                await bot.sendMessage(remoteJid, { text: `${BOT_EMOJI} pong!`});
                break;
            case 'haduken':
                await bot.sendMessage(remoteJid, { audio: { url: "./assets/audios/bom-dia-haduken.mp3" }, mimetype: 'audio/mp4' });
                break;
            case 'rodri1':
                await bot.sendMessage(remoteJid, { audio: { url: "./assets/audios/rodri1.mp3" }, mimetype: 'audio/mp4' });
                break;
            case 'repo':
                await bot.sendMessage(remoteJid, { text: `${repo}`});
                break;
            default:
                await bot.sendMessage(remoteJid, { text: `${BOT_EMOJI} Digite um Comando Válido!\n(Digite /menu para saber mais comandos)`});         
        }
    })
}
module.exports = middlewares;