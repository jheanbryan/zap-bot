const { BOT_EMOJI, TEMP_FOLDER } = require("../config");
const { extractDataMessage, downloadImage } = require("../utils");
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');
const peg = 'C:/ffmpeg/bin/ffmpeg'; //caminho do ffmpeg no pc
const ytdl = require('ytdl-core');

class Actions{

    constructor(bot, baileysMessage) {
        const { remoteJid, args, isImage } = extractDataMessage(baileysMessage)
        this.bot = bot;
        this.baileysMessage = baileysMessage;
        this.remoteJid = remoteJid;
        this.args = args;
        this.isImage = isImage;
    }

    //Figurinhas
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

    //Baixar musicas
    // Função para baixar o áudio e salvar em um arquivo
    async downloadAudio(url) {
        // URL do vídeo do YouTube
        const videoURL = url;

        // Opções para baixar apenas o áudio
        const options = {
            quality: 'highestaudio',
            filter: 'audioonly',
        };

        try {
            const info = await ytdl.getInfo(videoURL);
            const title = info.videoDetails.title;
            const audioStream = ytdl(videoURL, options);

            audioStream.pipe(fs.createWriteStream(`music.mp3`));

            audioStream.on('end', () => {
            console.log('Download concluído.');
            this.bot.sendMessage(this.remoteJid, { audio: { url: `./music.mp3` }, mimetype: 'audio/mp4' });  
            });
        } catch (error) {
            console.error('Erro ao baixar o áudio:', error);
        }

    }
}


module.exports = Actions;