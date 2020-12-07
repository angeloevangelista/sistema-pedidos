import { Router } from 'express';

import ClientsController from '../controllers/ClientsController';

const clientsRouter = Router();
const clientsController = new ClientsController();

clientsRouter.get('/:client_id', clientsController.find);

clientsRouter.post('/', clientsController.create);

clientsRouter.put('/:client_id', clientsController.update);

clientsRouter.delete('/:client_id', clientsController.destroy);

// It will be authenticated in the future, so it's not a problem... yet.
clientsRouter.get('/:client_id/orders', clientsController.index);

export default clientsRouter;
