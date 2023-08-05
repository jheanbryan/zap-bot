const connect = require('./connection') //importando a função connect

async function start(){
    const bot = await connect();
}
start();