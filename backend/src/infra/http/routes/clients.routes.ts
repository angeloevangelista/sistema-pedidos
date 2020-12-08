import { Router } from 'express';

import ensureAuthenticated from '../middleware/ensureAuthenticated';
import ClientsController from '../controllers/ClientsController';

const clientsRouter = Router();
const clientsController = new ClientsController();

clientsRouter.post('/', clientsController.create);

clientsRouter.use(ensureAuthenticated);

clientsRouter.get('/', clientsController.find);
clientsRouter.put('/', clientsController.update);
clientsRouter.delete('/', clientsController.destroy);

export default clientsRouter;
