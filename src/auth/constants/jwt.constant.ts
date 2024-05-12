import { envs } from 'src/config/dotenv-config';

export const jwtConstants = {
  secret: envs.JWT_SEED,
};
