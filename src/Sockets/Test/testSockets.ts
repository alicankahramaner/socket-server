import { Http } from "../../Http/http";
import { iSocket } from "../../Models/baseModel";

export namespace testSockets {
    export const test: iSocket = async (socket: any, data) => {
        let res = await Http.Get('posts/');

        socket.emit('info', res);
    }
}