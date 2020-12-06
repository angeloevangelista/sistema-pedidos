import { createConnection } from 'typeorm';

createConnection()
  .then(() => console.log('Database connection established successfully 🎲'))
  .catch((error) =>
    console.log(
      `❌  An error occurred while trying connect to database: ${error}`,
    ),
  );
