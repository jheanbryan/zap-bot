const { isCommand, extractDataMessage } = require('../src/utils/index');
const { BOT_EMOJI } = require('./config');
const Actions = require('./actions/index');

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
            case 's':
                await actions.sticker();
                break;
            case 'ping':
                await bot.sendMessage(remoteJid, { text: `${BOT_EMOJI} pong!`});
                break;
            default:
                await bot.sendMessage(remoteJid, { text: `${BOT_EMOJI} Digite um Comando Válido!`});         
        }
    })
}
module.exports = middlewares;