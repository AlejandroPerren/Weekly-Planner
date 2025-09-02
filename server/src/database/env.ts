import { config } from 'dotenv';
import path from 'path';
import { EnvConfig, DbConfig, TypeMode } from '../interfaces/env.interace';

class Environment {
    private _config: EnvConfig;

    constructor() {
        const mode = (process.env.NODE_ENV as TypeMode) || 'development';
        if (!['development', 'production', 'test'].includes(mode)) {
            throw new Error(`Invalid NODE_ENV mode: ${mode}`);
        }

        const envFile = `.env.${mode}`;
        config({ path: path.join(__dirname, '../environments', envFile) });

        this._config = this.loadConfig(mode);
    }

    private loadConfig(mode: TypeMode): EnvConfig {
        const port = parseInt(process.env.PORT || '3000', 10);
        const dbPort = parseInt(process.env.DB_PORT || '3306', 10);

        if (mode === 'production' && !process.env.DB_PASSWORD) {
            throw new Error('DB_PASSWORD is required in production environment.');
        }

        return {
            PORT: port,
            NODE_ENV: mode,
            BASE_URL: process.env.BASE_URL || `http://localhost:${port}`,
            DB_HOST: process.env.DB_HOST || 'localhost',
            DB_PORT: dbPort,
            DB_USERNAME: process.env.DB_USERNAME || 'root',
            DB_PASSWORD: process.env.DB_PASSWORD || '',
            DB_NAME: process.env.DB_NAME || 'test',
            DB_DIALECT: process.env.DB_DIALECT || 'mysql',
            INIT_PASSWORD: process.env.INIT_PASSWORD || 'default_init_password',
            db: {
                host: process.env.DB_HOST || 'localhost',
                port: dbPort,
                username: process.env.DB_USERNAME || 'root',
                password: process.env.DB_PASSWORD || '',
                name: process.env.DB_NAME || 'test',
                dialect: process.env.DB_DIALECT || 'mysql',
            }
        };
    }

    public get config(): EnvConfig {
        return this._config;
    }
}

const envInstance = new Environment();

export default envInstance.config;
export const {
    PORT,
    NODE_ENV,
    BASE_URL,
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    DB_DIALECT,
    INIT_PASSWORD,
} = envInstance.config;