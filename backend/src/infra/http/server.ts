import http from 'http';
import app from './app';

const PORT = process.env.PORT || 3333;
const server = http.createServer(app);

server.listen(PORT, () =>
  // eslint-disable-next-line no-console
  console.log(`Server is running at http://127.0.0.1:${PORT} 🚀`),
);
