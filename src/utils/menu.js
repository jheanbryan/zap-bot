const { BOT_EMOJI } = require('../config');
const repo ='https://github.com/jheanbryan/zap-bot';
let date = new Date();

//menu de opções
const menu = `${BOT_EMOJI}
╭━━⪩ BEM VINDO! ⪨━━
▢
▢ • BRYAN_BOT
▢ • Data: ${date.toLocaleDateString("pt-br")}
▢ • Hora: ${date.toLocaleTimeString("pt-br")}
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
▢
╰━━─「🌍」─━━

╭━━⪩ SOBRE MIM 👨‍💻 ⪨━━
▢
▢ • Meu repositório: ${repo}
▢
╰━━─「🎇」─━━
`;
module.exports = {
    menu
}