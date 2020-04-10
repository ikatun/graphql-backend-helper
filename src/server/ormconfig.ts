import 'dotenv/config'
import 'reflect-metadata';

import env from 'env-var';

const DATABASE_TYPE = env.get('DATABASE_TYPE', 'postgres').asString();
const DATABASE_SYNCHRONIZE = env.get('DATABASE_SYNCHRONIZE', 'false').asBoolStrict();
const DATABASE_LOGGING = env.get('DATABASE_LOGGING', 'false').asString();
const DATABASE_URL = env.get('DATABASE_URL').required().asString();

export const connectionOptions: any = {
  entities: ['build/**/models/*.js'],
  type: DATABASE_TYPE,
  synchronize: DATABASE_SYNCHRONIZE,
  logging: DATABASE_LOGGING,
  migrations: ['build/migrations/**.js'],
  cli: {
    migrationsDir: 'build/migrations',
  },
  url: DATABASE_URL,
};
