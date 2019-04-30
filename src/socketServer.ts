import socket, { Socket } from 'socket.io';

export class SocketServer {
    private socket: any;
    private sockets: any;
    private clients: string[] = [];

    constructor(http: any, sockets: any[]) {
        this.socket = socket(http);

        this.sockets = sockets;

        this.socket.on('connection', (socket: Socket) => {
            console.log('New Connection: ' + socket.client.id);
            this.clients.push(socket.client.id);
            console.log('Connected Clients: ' + this.clients.length);

            socket.on('disconnect', () => {
                this.clients = this.clients.filter(c => c !== socket.client.id);
            });

            this.onSockets(socket);

        });
    }

    private onSockets(socket: any) {

        let keys = Object.keys(this.sockets);

        keys.forEach(s => {
            socket.on(s, (data: any) => {
                this.sockets[s](socket, this);
            })
        });
    }
}