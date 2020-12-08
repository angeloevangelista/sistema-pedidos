import { createConnection, getConnectionOptions } from 'typeorm';

async function connect() {
  const connectionOptions = await getConnectionOptions();

  createConnection(connectionOptions)
    .then(() => console.log('Database connection established successfully 🎲'))
    .catch((error) =>
      console.log(
        `❌  An error occurred while trying connect to database: ${error}`,
      ),
    );
}

export default connect();
