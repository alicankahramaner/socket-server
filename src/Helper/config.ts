const config = require('../config.json');

export namespace Config {
    export const get = (key: string): any => {
        return config[key];
    }
}