import axios from 'axios';
import { Config } from '../Helper/config';

const httpConfig = Config.get('http');

const instance = axios.create({
    baseURL: httpConfig.baseAPIUrl,
    timeout: httpConfig.timeOut
});

export namespace Http {
    export const Get = async (url: string) => {
        return await instance.get(url).then(res => {
            return res.data;
        });
    }

    export const Post = async (url: string, data: any) => {
        return await instance.post(url, JSON.parse(data)).then(res => {
            return res.data;
        })
    }
}