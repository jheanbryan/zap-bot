const { BOT_EMOJI, TEMP_FOLDER } = require("../config");
const { extractDataMessage, downloadImage } = require("../utils");
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');
const ffmpegPath = 'C:/ffmpeg/bin/ffmpeg.exe'; //caminho do ffmpeg no pc

class Actions{

    constructor(bot, baileysMessage) {
        const { remoteJid, args, isImage } = extractDataMessage(baileysMessage)
        this.bot = bot;
        this.baileysMessage = baileysMessage;
        this.remoteJid = remoteJid;
        this.args = args;
        this.isImage = isImage;
    }

    async sticker(){
        if (!this.isImage){
            await this.bot.sendMessage(this.remoteJid, { text: `${BOT_EMOJI} ❌ ERRO! Você precisa enviar uma imagem!` });
            return
        }

        const inputPath = await downloadImage(this.baileysMessage, 'input');
        const outputPath = path.resolve(TEMP_FOLDER, 'output.webp');

        exec(`${ffmpegPath} -i "${inputPath}" -vf scale=512:512 "${outputPath}"`, async (error)  =>{
            if (error){
                await this.bot.sendMessage(this.remoteJid, { text: `${BOT_EMOJI} ❌ ERRO! Não foi possível converter imagem para figurinha!` });
                console.log(error);
                return
            }

            await this.bot.sendMessage(this.remoteJid, {
                sticker: { url: outputPath }
            });

            //fs.unlinkSync(inputPath);
           //fs.unlinkSync(outputPath);
        })
    }
}


module.exports = Actions;