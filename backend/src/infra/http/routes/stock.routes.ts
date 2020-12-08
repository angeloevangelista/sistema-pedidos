import { Router } from 'express';

import ensureAuthenticated from '../middleware/ensureAuthenticated';
import StockController from '../controllers/StockController';

const stockRouter = Router();
const stockController = new StockController();

stockRouter.use(ensureAuthenticated);
stockRouter.get('/', stockController.index);

export default stockRouter;
