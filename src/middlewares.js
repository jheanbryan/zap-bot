const { isCommand, extractDataMessage } = require('../src/utils/index');
const { BOT_EMOJI } = require('./config');
const Actions = require('./actions/index');
const { generateMenu } = require('../src/utils/menu');
const { generate } = require('qrcode-terminal');


async function middlewares(bot){
    bot.ev.on('messages.upsert', async ({ messages, type }) => {
        console.log(messages);
        const baileysMessage = messages[0]; //pegar apenas a mensagem

        if(!baileysMessage?.message || !isCommand(baileysMessage)){
            return
        }

        const actions = new Actions(bot, baileysMessage);
        const { command, remoteJid, args } = extractDataMessage(baileysMessage)

        switch (command.toLowerCase()) {
            case 'menu':
                const menu = generateMenu()
                await bot.sendMessage(remoteJid, {text: `${menu}`});
                break;
            case 's':
                await actions.sticker();
                break;
            case 'cep':
                await actions.consultCep(args);
                break;
            case 'musica':
            case 'música':
                await actions.downloadAudio(args);
                break;
            case 'ping':
                await bot.sendMessage(remoteJid, { text: `${BOT_EMOJI} pong!`});
                break;
            case 'audio1':
                await bot.sendMessage(remoteJid, { audio: { url: "./assets/audios/audio1.mp3" }, mimetype: 'audio/mp4' });
                break;
            case 'audio2':
                await bot.sendMessage(remoteJid, { audio: { url: "./assets/audios/audio2.mp3" }, mimetype: 'audio/mp4' });
                break;
            case 'sobre':
                  await actions.messageInfo();
                break;
            case 'cnpj':
                await actions.cnpj(args);
                break;
            default:
                await bot.sendMessage(remoteJid, { text: `${BOT_EMOJI} Digite um Comando Válido!\n(Digite /menu para saber mais comandos)`});         
        }
    })
}
module.exports = middlewares;