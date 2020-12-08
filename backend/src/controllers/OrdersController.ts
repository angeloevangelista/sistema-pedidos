import { Request, Response } from 'express';

import AppError from '../errors/AppError';
import OrdersRepository from '../database/typeorm/repositories/OrdersRepository';
import ClientsRepository from '../database/typeorm/repositories/ClientsRepository';
import ProductsRepository from '../database/typeorm/repositories/ProductsRepository';

class OrdersController {
  async find(request: Request, response: Response) {
    const { order_id } = request.params;

    const ordersRepository = new OrdersRepository();

    const order = await ordersRepository.findById(order_id);

    if (!order) throw new AppError('Order not found.');

    return response.json(order);
  }

  async index(request: Request, response: Response) {
    const ordersRepository = new OrdersRepository();

    const orders = await ordersRepository.list();

    return response.json(orders);
  }

  async create(request: Request, response: Response) {
    const { client_id, product_id, amount, discount } = request.body;

    const ordersRepository = new OrdersRepository();
    const clientsRepository = new ClientsRepository();
    const productsRepository = new ProductsRepository();

    const clientExists = await clientsRepository.findById(client_id);

    if (!clientExists) throw new AppError('Client not found');

    const productExists = await productsRepository.findById(product_id);

    if (!productExists) throw new AppError('Product not found');

    const order = await ordersRepository.create({
      client_id,
      product_id,
      amount,
      discount,
    });

    return response.json(order);
  }

  async destroy(request: Request, response: Response) {
    const { order_id } = request.params;

    const ordersRepository = new OrdersRepository();

    const orderExists = await ordersRepository.findById(order_id);

    if (!orderExists) throw new AppError('Order not found.');

    await ordersRepository.delete(order_id);

    return response.status(204).send();
  }
}

export default OrdersController;
