import express from 'express';
import http from 'http';
import path = require('path');

import { SocketServer } from './src/socketServer';
import { socketCombiler } from './src/Sockets/socketCombiler';

const app: express.Application = express();
const httpServer = http.createServer(app);

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'index.html'))
});

new SocketServer(httpServer, socketCombiler);

httpServer.listen(8080, () => {
    console.log('Listen: 8080');
})