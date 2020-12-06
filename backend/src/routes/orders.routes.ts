import { Router } from 'express';

const ordersRouter = Router();

ordersRouter.get('/:order_id', (request, response) =>
  response.send('getting order information'),
);

ordersRouter.post('/', (request, response) => response.send('creating order'));

ordersRouter.delete('/:order_id', (request, response) =>
  response.send('cancelling order'),
);

export default ordersRouter;
