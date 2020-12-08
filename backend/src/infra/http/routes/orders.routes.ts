import { Router } from 'express';

import ensureAuthenticated from '../middleware/ensureAuthenticated';
import OrdersController from '../controllers/OrdersController';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(ensureAuthenticated);

ordersRouter.get('/', ordersController.index);
ordersRouter.get('/:order_id', ordersController.find);
ordersRouter.post('/', ordersController.create);
ordersRouter.delete('/:order_id', ordersController.destroy);

export default ordersRouter;
