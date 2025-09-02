import { config } from 'dotenv';
import path from 'path';

type TypeMode = 'development' | 'production' | 'test';

// Detecta el modo primero
const mode = (process.env.NODE_ENV as TypeMode) || 'development';

// Valida
if (!['development', 'production', 'test'].includes(mode)) {
  throw new Error('Invalid mode');
}

// Construye el path del archivo .env
const envFile = `.env.${mode}`;
config({ path: path.join(__dirname, 'environments', envFile) });

// Ahora que dotenv ya se ejecutó, puedes leer las variables
export const PORT = process.env.PORT || '4000';
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const BASE_URL = process.env.BASE_URL || '';