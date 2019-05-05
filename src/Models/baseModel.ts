import { Socket } from "socket.io";

export interface iSocket {
    (socket: Socket, data: any): any
}
