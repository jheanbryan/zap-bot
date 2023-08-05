//https://www.npmjs.com/package/@adiwajshing/baileys?activeTab=readme
//https://www.youtube.com/watch?v=GGm9zx_f8KA

const{default: makeWASocket, DisconnectReason} = require('@adiwajshing/baileys'); //função para instanciar uma nova conexão com o zap

//função para conectar
async function connect(){

    const bot = makeWASocket({
        printQRInTerminal: true, //propriedade de imprimir QR code no terminar é true
        defaultQueryTimeoutMs: undefined //caso a consulta demore mt, fecha a conexão
    });

    bot.ev.on('connection.update',(update) => {
        const {connection, lastDisconnect} = update;

        //se a conexão fechar, tentar dnv
        if (connection == 'close'){
            const shouldReconnect = lastDisconnect.error?.output?.statusCode != DisconnectReason.loggedOut;

            //se eu puder reconectar, chamar novamente a função connect
            if (shouldReconnect){
                connect();
            }
        }
    })

    return bot; 
}
module.exports = connect;