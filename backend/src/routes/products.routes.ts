import { Router } from 'express';

const productsRouter = Router();

productsRouter.get('/', (request, response) =>
  response.send('getting all products information'),
);

productsRouter.get('/:product_id', (request, response) =>
  response.send('getting product information'),
);

productsRouter.post('/', (request, response) =>
  response.send('creating product'),
);

productsRouter.put('/product_id', (request, response) =>
  response.send('updating product information'),
);

productsRouter.delete('/product_id', (request, response) =>
  response.send('removing product from store'),
);

export default productsRouter;
