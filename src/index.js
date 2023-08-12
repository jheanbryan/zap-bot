const { connect } = require("./connection");
const middlewares = require('./middlewares');

async function start() {
  console.log('estartandoo\n')
  const bot = await connect();
  await middlewares(bot);
}

start();