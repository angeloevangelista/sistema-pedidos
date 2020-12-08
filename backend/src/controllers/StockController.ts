import { Request, Response } from 'express';

import ProductsRepository from '../database/typeorm/repositories/ProductsRepository';

class StockController {
  async index(request: Request, response: Response) {
    const productsRepository = new ProductsRepository();

    const { id: client_id } = request.client;
    const { product_name } = request.query;

    const products = await productsRepository.listByClientId(
      client_id,
      (product_name as string) ?? '',
    );

    return response.json(products);
  }
}

export default StockController;
