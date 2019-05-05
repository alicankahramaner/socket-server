export interface iChat extends iMessage {
    Id: string;
}

export interface iMessage {
    Flag: string,
    Message: string
}

export interface iFlag {
    Code: string;
    Flag: string;
}