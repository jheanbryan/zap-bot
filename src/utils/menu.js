const { BOT_EMOJI } = require('../config');

//menu de opções
const menu = `${BOT_EMOJI}
Comandos Gerais ℹ
/menu  => Menu geral de comandos
/ping  => Testar se o bot está online
/s     => Retorna uma figurinha ao marcar uma imagem\n
Comandos de audios 🔊
/haduken => Retorna um audio
/rodri1 => Retorna um audio\n
Sobre meu criador 👨‍💻
/repo => Retorna o repositório
`;

const repo ='https://github.com/jheanbryan/zap-bot';

module.exports = {
    menu,
    repo
}