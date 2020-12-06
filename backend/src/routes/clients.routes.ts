import { Router } from 'express';

const clientsRouter = Router();

clientsRouter.get('/:client_id', (request, response) =>
  response.send('getting client information'),
);

clientsRouter.post('/', (request, response) =>
  response.send('creating client'),
);

clientsRouter.put('/:client_id', (request, response) =>
  response.send('updating client information'),
);

clientsRouter.delete('/:client_id', (request, response) =>
  response.send('disabling client registry'),
);

// It will be authenticated in the future, so it's not a problem... yet.
clientsRouter.get('/:client_id/orders', (request, response) =>
  response.send('getting all the orders for this client'),
);

export default clientsRouter;
