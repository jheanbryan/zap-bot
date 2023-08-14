const ytdl = require('ytdl-core');
const fs = require('fs');

// URL do vídeo do YouTube
const videoURL = 'https://www.youtube.com/watch?v=DURGfr1oh30';

// Opções para baixar apenas o áudio
const options = {
  quality: 'highestaudio',
  filter: 'audioonly',
};

// Função para baixar o áudio e salvar em um arquivo
async function downloadAudio() {
  try {
    const info = await ytdl.getInfo(videoURL);
    const title = info.videoDetails.title;
    const audioStream = ytdl(videoURL, options);

    audioStream.pipe(fs.createWriteStream(`${title}.mp3`));

    audioStream.on('end', () => {
      console.log('Download concluído.');
    });
  } catch (error) {
    console.error('Erro ao baixar o áudio:', error);
  }
}

downloadAudio();
