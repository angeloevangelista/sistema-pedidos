const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  type: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,

  entities: [
    isDevelopment
      ? 'src/database/typeorm/entities/**/*.ts'
      : 'database/typeorm/entities/**/*.js',
  ],
  migrations: ['src/database/typeorm/migrations/**/*.ts'],
  cli: {
    migrationsDir: 'src/database/typeorm/migrations',
  },
  ...(isDevelopment
    ? {
        logging: true,
      }
    : {
        logging: false,
      }),
};
