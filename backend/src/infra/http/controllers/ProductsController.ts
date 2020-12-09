import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateProductService from '../../../services/products/CreateProductService';
import UpdateProductService from '../../../services/products/UpdateProductService';
import FindProductService from '../../../services/products/FindProductService';
import ListProductsService from '../../../services/products/ListProductsService';
import DeleteProductService from '../../../services/products/DeleteProductService';

class ProductsController {
  async index(request: Request, response: Response) {
    const { product_name } = request.query;

    const listProducts = container.resolve(ListProductsService);

    const products = await listProducts.execute((product_name as string) ?? '');

    return response.json(products);
  }

  async find(request: Request, response: Response) {
    const { product_id } = request.params;

    const findProduct = container.resolve(FindProductService);

    const product = await findProduct.execute(product_id);

    return response.json(product);
  }

  async create(request: Request, response: Response) {
    const { id: client_id } = request.client;
    const { name, price } = request.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      client_id,
      name,
      price,
    });

    return response.status(201).json(product);
  }

  async update(request: Request, response: Response) {
    const { id: client_id } = request.client;
    const { product_id } = request.params;
    const { name, price } = request.body;

    const updateProduct = container.resolve(UpdateProductService);

    const product = await updateProduct.execute({
      product_id,
      client_id,
      price,
      name,
    });

    return response.status(200).json(product);
  }

  async destroy(request: Request, response: Response) {
    const { id: client_id } = request.client;
    const { product_id } = request.params;

    const deleteProduct = container.resolve(DeleteProductService);

    await deleteProduct.execute({
      client_id,
      product_id,
    });

    return response.status(204).send();
  }
}

export default ProductsController;
