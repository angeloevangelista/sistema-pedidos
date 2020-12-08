import { Router } from 'express';

import sessionsRouter from './sessions.routes';
import ordersRouter from './orders.routes';
import clientsRouter from './clients.routes';
import productsRouter from './products.routes';
import stockRouter from './stock.routes';

const routes = Router();

routes.get('/', (request, response) =>
  response.json({
    message: 'Maybe You will find some instructions here',
  }),
);

routes.use('/sessions', sessionsRouter);
routes.use('/products', productsRouter);
routes.use('/clients', clientsRouter);
routes.use('/orders', ordersRouter);
routes.use('/stock', stockRouter);

export default routes;
