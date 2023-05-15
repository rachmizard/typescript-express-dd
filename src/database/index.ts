import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from '@config';
import { join } from 'path';
import { DataSource } from 'typeorm';

export const dbConnection = new DataSource({
  type: 'postgres',
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: Number(DB_PORT),
  database: DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [join(__dirname, '../**/*entity{.ts,.js}', '../**/*Entity{.ts,.js}')],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  subscribers: [join(__dirname, '../**/*.subscriber{.ts,.js}')],
});
