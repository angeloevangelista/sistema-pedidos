import { Request, Response } from 'express';

import ProductType from '../../../data/entities/product';
import AppError from '../../../errors/AppError';
import ProductsRepository from '../../typeorm/repositories/ProductsRepository';

class ProductsController {
  async index(request: Request, response: Response) {
    const productsRepository = new ProductsRepository();
    const { product_name } = request.query;

    const products = await productsRepository.list(
      (product_name as string) ?? '',
    );

    return response.json(products);
  }

  async find(request: Request, response: Response) {
    const productsRepository = new ProductsRepository();
    const { product_id } = request.params;

    const product = await productsRepository.findById(product_id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    return response.json(product);
  }

  async create(request: Request, response: Response) {
    const productsRepository = new ProductsRepository();

    const { id: client_id } = request.client;
    const { name, price } = request.body;

    const product = await productsRepository.create({
      name,
      price,
      client_id,
    });

    return response.status(201).json(product);
  }

  async update(request: Request, response: Response) {
    const productsRepository = new ProductsRepository();

    const { id: client_id } = request.client;
    const { product_id } = request.params;
    const { name, price } = request.body;

    const foundProduct = await productsRepository.findById(product_id);

    if (!foundProduct) {
      throw new AppError('Product not found.');
    }

    if (foundProduct.client_id !== client_id)
      throw new AppError(
        'You can only update information for your own products.',
        401,
      );

    const productData: Partial<ProductType> = {
      name,
      price,
    };

    const product = await productsRepository.update(product_id, productData);

    return response.status(200).json(product);
  }

  async destroy(request: Request, response: Response) {
    const productsRepository = new ProductsRepository();

    const { id: client_id } = request.client;
    const { product_id } = request.params;

    const foundProduct = await productsRepository.findById(product_id);

    if (!foundProduct) throw new AppError('Product not found.');

    if (foundProduct.client_id !== client_id)
      throw new AppError('You can only remove your own products.', 401);

    await productsRepository.delete(product_id);

    return response.status(204).send();
  }
}

export default ProductsController;
