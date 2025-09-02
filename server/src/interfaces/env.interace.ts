export type TypeMode = 'development' | 'production' | 'test';

export interface DbConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
    dialect: string;
}

export interface EnvConfig {
    PORT: number;
    NODE_ENV: TypeMode;
    BASE_URL: string;
    DB_HOST: string;
    DB_PORT: number;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DB_DIALECT: string;
    INIT_PASSWORD: string;
    db: DbConfig;
}