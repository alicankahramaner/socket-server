import { iSocket } from "../../Models/baseModel";
import { iChat, iMessage, iFlag } from "../../Models/chatModels";
import { Http } from "../../Http/http";

let chat: iChat[] = [
    {
        Id: 'Chatbot',
        Message: 'Welcome to chat room',
        Flag: 'https://cdn2.iconfinder.com/data/icons/artificial-intelligence-5/64/ArtificialIntelligence8-512.png'
    }
];

let flags: iFlag[] = [];

export namespace chatSockets {
    export const getAllMessages: iSocket = (socket: SocketIO.Socket, data: any) => {
        chatSockets.sendChats(socket, data);
    }

    export const sendMessage: iSocket = async (socket: SocketIO.Socket, data: iMessage) => {

        let flag = flags.find(e => e.Code === data.Flag);

        if (!flag) {
            let res = await Http.Get('alpha/' + data.Flag);

            flag = {
                Code: data.Flag,
                Flag: res.flag
            };

            flags.push(flag);
        }

        chat.push({
            Id: socket.client.id,
            Message: data.Message,
            Flag: flag.Flag
        });

        chatSockets.sendChats(socket, data);
    }

    export const sendChats: iSocket = (socket: SocketIO.Socket, data: any) => {
        socket.broadcast.emit('message', chat);
        socket.emit('message', chat);
    }
}