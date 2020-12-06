import cors from 'cors';
import express from 'express';
import 'express-async-errors';

import errorMiddleware from './middleware/errorMiddleware';

const app = express();

app.use(cors());
app.use(express.json());

app.use(errorMiddleware); // this needs to be used after all of the others middleware

export default app;
