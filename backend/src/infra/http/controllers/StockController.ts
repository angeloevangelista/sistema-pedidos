import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListStockProductsService from '../../../services/products/ListStockProductsService';

class StockController {
  async index(request: Request, response: Response) {
    const { id: client_id } = request.client;
    const { product_name } = request.query;

    const listStockProducts = container.resolve(ListStockProductsService);

    const products = await listStockProducts.execute({
      client_id,
      product_name: (product_name as string) ?? '',
    });

    return response.json(products);
  }
}

export default StockController;
