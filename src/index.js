const app = require('./app');
const config = require('./config/config');

console.log('Starting services ...');
require('./cronJobs');
// eslint-disable-next-line import/order
const http = require('http');
// socket initialization
const server = http.createServer(app);
// eslint-disable-next-line import/order
const io = require('socket.io')(server, { cors: { origin: '*' } });

global.io = io;
require('./config/rootSocket')(io);

server.listen(config.port, () => {
    console.info(`Server is listening to port ${config.port}`);
});
