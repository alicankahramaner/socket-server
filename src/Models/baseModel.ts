import { Socket } from "socket.io";

export interface iSocket {
    (socket: Socket, data: object): any
}
