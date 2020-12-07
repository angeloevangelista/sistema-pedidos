import { Router } from 'express';

import ProductsController from '../controllers/ProductsController';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', productsController.index);

productsRouter.get('/:product_id', productsController.find);

productsRouter.post('/', productsController.create);

productsRouter.put('/:product_id', productsController.update);

productsRouter.delete('/:product_id', productsController.destroy);

export default productsRouter;
