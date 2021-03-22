const net = require('net');
const utils = require('./utils');

const sockets = {
  _list: [],
  add(socket) {
    this._list.push(socket);
  },
  remove(socket) {
    const index = this._list.indexOf(socket);
    if (index !== -1) {
      this._list.splice(index, 1);
    }
  },
  forEach(event) {
    this._list.forEach(event);
  }
};

const server = new net.Server((socket) => {
  utils.log('server connectionListener');
  listenClient(socket);
  sockets.add(socket);
});

server.on('connection', () => {
  utils.log('server connection event');
});

server.on('close', () => {
  utils.log('server close event');
});

server.on('error', () => {
  utils.log('server error event');
});

server.on('listening', () => {
  utils.log('server listening event');
});

server.listen({
  host: 'localhost',
  port: 8022
});



logServerStatus();

function logServerStatus() {
  utils.log('server.listening', server.listening);
  utils.log('server.address()', server.address());
  server.getConnections((err, count) => {
    utils.log('server.getConnections', 'err:', err, 'count:', count);
  });
}

function logClientStatus(socket) {
  utils.log('client.address()', socket.address());
}

function listenClient(socket) {
  socket.setEncoding('utf8');
  socket.on('close', () => {
    utils.log('client close event\n');
    sockets.remove(socket);
  });
  socket.on('connect', () => {
    utils.log('client connect event');
  });
  socket.on('data', (data) => {
    utils.log('收到客户端消息', data);
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

/* 控制台输入内容并回车. 将内容发送给所有客户端 socket */
function listenUserInput() {
  const tips = '';
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question(tips, (answer) => {
    rl.close();
    // console.log('========', answer.trim());
    sockets.forEach((socket) => {
      socket.write(answer.trim(), 'utf-8');
    });
    listenUserInput();
  });
}

listenUserInput();