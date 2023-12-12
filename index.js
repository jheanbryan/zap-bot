const { connect } = require("./src/connection");
const middlewares = require('./src/middlewares');

async function start() {
  console.log('estartandoo\n')
  const bot = await connect();
  await middlewares(bot);
}

start();