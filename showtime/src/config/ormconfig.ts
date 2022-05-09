import { ConnectionOptions } from 'typeorm';

// You can load you .env file here synchronously using dotenv package (not installed here),
// import * as dotenv from 'dotenv';
// import * as fs from 'fs';
// const environment = process.env.NODE_ENV || 'development';
// const data: any = dotenv.parse(fs.readFileSync(`${environment}.env`));
// You can also make a singleton service that load and expose the .env file content.
// ...

// Check typeORM documentation for more information.
const config: ConnectionOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'martin',
  password: '',
  database: 'show_time',

  entities: [__dirname + '/../**/*.entity{.ts,.js}'],

  // Run migrations automatically,
  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  // you can disable this if you prefer running migrations manually.
  migrationsRun: false,
  logging: ['error'],
  // Allow both start:prod and start:dev to use migrations
  logger: 'advanced-console',
  // the compiled js in prod or the ts in dev.
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  cli: {
    // Location of migrations should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: 'src/migrations',
  },
};
export = config;
