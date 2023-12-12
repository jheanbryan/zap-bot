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

        //falta fazer o tratamento de scale da figurinha
        exec(`${peg} -i ${inputPath} -vf scale=512:512:force_original_aspect_ratio=decrease,pad=512:512:(ow-iw)/2:(oh-ih)/2,format=rgba ${outputPath}`, async (error)  =>{

            if (error){
                console.log('\n deu erro')
                await this.bot.sendMessage(this.remoteJid, { text: `${BOT_EMOJI} ❌ ERRO! Não foi possível converter imagem para figurinha!` });
                console.log(error);
                return
            }

            await this.bot.sendMessage(this.remoteJid, {
                sticker: { url: outputPath },
            });

            fs.unlinkSync(inputPath);
            fs.unlinkSync(outputPath);
        })
    }

    //Baixa musicas
    async downloadAudio(args) {
        if (args) {
            const videoURL = args;
            console.log('URL:', videoURL);

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
                this.bot.sendMessage(this.remoteJid, { audio: { url: `./music.mp3` }, mimetype: 'audio/mp4' }); 
                });
            } catch (error) {
                console.error('Erro ao baixar o áudio:', error);
            }
            
          } else {
            this.bot.sendMessage(this.remoteJid, { text: `${BOT_EMOJI} Comando /musica requer uma URL válida.` });
          }
    }



    //Consulta de cep
    async consultCep(cep){
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {

        var messageCep;
        
        if(data.localidade != ''){
            messageCep = `Localidade: ${data.localidade}`
        }
        if (data.logradouro != ''){
            messageCep = messageCep + `\nLogradouro: ${data.logradouro}`;
        }
        if(data.complemento != ''){
            messageCep = messageCep + `\nComplemento: ${data.complemento}`;
        }
        if(data.bairro){
            messageCep = messageCep + `\nBairro: ${data.bairro}`;
        }
        this.bot.sendMessage(this.remoteJid, { text: `${messageCep}` });
    }).catch(error => {
        console.error("Ocorreu um erro:", error);
        console.error("Erro:", error.response);
    });
    }


    //Busca de CNPJ
    async cnpj(cnpj){
        fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`)
        .then(response => response.json())
        .then(data => {

        var messageCnpj;
        
        messageCnpj = `Nome: ${data.nome_fantasia}\n Local: ${data.municipio}, ${data.uf}\n Bairro: ${data.bairro} - nº ${data.numero}\n Telefone: ${data.ddd_telefone_1} `
        this.bot.sendMessage(this.remoteJid, { text: `${messageCnpj}` });
    }).catch(error => {
        console.error("Ocorreu um erro:", error);
        console.error("Erro:", error.response);
    });
    }

    //Exibir mensagem sobre o bot
    async messageInfo(){
        this.bot.sendMessage(this.remoteJid, { text: `Olá 🖐, Sou um bot desenvolvido a partir da linguagem JavaScript, ainda não possuo a capacidade de pensar e entender frases, mas posso te ajudar com algumas coisas, para saber mais digite o seguinte comando: /menu`});
    }
}


module.exports = Actions;