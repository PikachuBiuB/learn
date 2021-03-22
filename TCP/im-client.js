const net = require('net');
const utils = require('./utils');

const socket = new net.Socket();

socket.connect({
  port: 8022,
  host: 'localhost'
});

listenClient(socket);

function listenClient(socket) {
  socket.setEncoding('utf8');
  socket.on('close', () => {
    utils.log('client close event');
  });
  socket.on('connect', () => {
    utils.log('client connect event');
  });
  socket.on('data', (data) => {
    utils.log('收到服务端消息: ', data);
    utils.log('client socket.bytesRead', socket.bytesRead);
    utils.log('client socket.bytesWritten', socket.bytesWritten);
  });
  socket.on('drain', () => {
    utils.log('client drain event');
  });
  socket.on('end', () => {
    utils.log('client end event');
  });
  socket.on('error', () => {
    utils.log('client error event');
  });
  socket.on('lookup', () => {
    utils.log('client lookup event');
  });
  socket.on('ready', () => {
    utils.log('client ready event');
  });
  socket.on('timeout', () => {
    utils.log('client timeout event');
  });
}

/* 控制台输入内容并回车. 将内容发送给服务端 socket */
function listenUserInput(socket) {
  const tips = '';
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question(tips, (answer) => {
    rl.close();
    // console.log('========', answer.trim());
    socket.write(answer.trim(), 'utf8');
    listenUserInput(socket);
  });
}

listenUserInput(socket);