const { BOT_EMOJI } = require('../config');
const repo ='https://github.com/jheanbryan/zap-bot';

// Função para obter a data e hora atual formatada
function getCurrentDateTime() {
    const date = new Date();
    const formattedDate = date.toLocaleDateString("pt-br");
    const formattedTime = date.toLocaleTimeString("pt-br");
    return { formattedDate, formattedTime };
  }

function generateMenu(){
    const { formattedDate, formattedTime } = getCurrentDateTime();

    //menu de opções
    const menu = `${BOT_EMOJI}
╭━━⪩ BEM VINDO! ⪨━━
▢
▢ • BRYAN_BOT
▢ • Data: ${formattedDate}
▢ • Hora: ${formattedTime}
▢ • Prefixo: /
▢
╰━━─「🪐」─━━

╭━━⪩ COMANDOS GERAIS ℹ ⪨━━
▢
▢ •/menu  => Menu geral de comandos
▢ •/ping  => Testar se o bot está online
▢ •/s     => Retorna uma figurinha ao marcar uma imagem
▢
╰━━─「🚀」─━━

╭━━⪩ COMANDOS DE AUDIOS 🔊 ⪨━━
▢
▢ •/audio1 => Bom dia HADUKEN
▢ •/audio2 => Quem você pensa que é?
▢ •/musica (link do youtube) => Baixa uma música do YouTube
▢
╰━━─「🌍」─━━

╭━━⪩ SOBRE MIM 👨‍💻 ⪨━━
▢
▢ • Meu repositório: ${repo}
▢
╰━━─「🎇」─━━
`;

    return menu
}

module.exports = {
    generateMenu
}
