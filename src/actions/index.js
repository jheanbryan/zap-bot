const { BOT_EMOJI, TEMP_FOLDER } = require("../config");
const { extractDataMessage, downloadImage } = require("../utils");
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');
const peg = 'C:/ffmpeg/bin/ffmpeg'; //caminho do ffmpeg no pc

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

        console.log('\né uma imagem sim')
        const inputPath = await downloadImage(this.baileysMessage, 'input');
        const outputPath = path.resolve(TEMP_FOLDER, 'output.webp');

        console.log('\n vou executar o exec agora')
        //falta fazer o tratamento de scale da figurinha
        exec(`${peg} -i ${inputPath} -vf scale=512:512 ${outputPath}`, async (error)  =>{

            if (error){
                console.log('\n deu erro')
                await this.bot.sendMessage(this.remoteJid, { text: `${BOT_EMOJI} ❌ ERRO! Não foi possível converter imagem para figurinha!` });
                console.log(error);
                return
            }

            console.log('\n so falta eu mandar, pera ai')
            await this.bot.sendMessage(this.remoteJid, {
                sticker: { url: outputPath },
            });

            fs.unlinkSync(inputPath);
            fs.unlinkSync(outputPath);
        })
    }
}


module.exports = Actions;