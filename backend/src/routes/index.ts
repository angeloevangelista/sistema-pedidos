import { Router } from 'express';

import ordersRouter from './orders.routes';
import clientsRouter from './clients.routes';
import productsRouter from './products.routes';

const routes = Router();

routes.get('/', (request, response) =>
  response.json({
    message: 'Maybe You will find some instructions here',
  }),
);

routes.use('/products', productsRouter);
routes.use('/clients', clientsRouter);
routes.use('/orders', ordersRouter);

export default routes;
