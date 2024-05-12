import 'dotenv/config';

export const envs = {
  PORT: process.env.PORT,
  JWT_SEED: process.env.JWT_SEED,
  DB_NAME: process.env.POSTGRES_DATABASE,
  DB_USER: process.env.POSTGRES_USER,
  DB_PASSWORD: process.env.POSTGRES_PASSWORD,
  DB_HOST: process.env.POSTGRES_HOST,
  DB_PORT: process.env.POSTGRES_PORT,
};
