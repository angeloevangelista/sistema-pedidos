import { Request, Response } from 'express';

import AppError from '../../../errors/AppError';
import OrdersRepository from '../../typeorm/repositories/OrdersRepository';
import ClientsRepository from '../../typeorm/repositories/ClientsRepository';
import ProductsRepository from '../../typeorm/repositories/ProductsRepository';

class OrdersController {
  async find(request: Request, response: Response) {
    const { order_id } = request.params;
    const { id: client_id } = request.client;

    const ordersRepository = new OrdersRepository();

    const order = await ordersRepository.findById(order_id);

    if (!order) throw new AppError('Order not found.');

    if (order.client_id !== client_id)
      throw new AppError('You can only view your own orders.', 401);

    return response.json(order);
  }

  async index(request: Request, response: Response) {
    const { id: client_id } = request.client;

    const ordersRepository = new OrdersRepository();

    const orders = await ordersRepository.listByClientId(client_id);

    return response.json(orders);
  }

  async create(request: Request, response: Response) {
    const { product_id, amount, discount } = request.body;
    const { id: client_id } = request.client;

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
    const { id: client_id } = request.client;

    const ordersRepository = new OrdersRepository();

    const foundOrder = await ordersRepository.findById(order_id);

    if (!foundOrder) throw new AppError('Order not found.');

    if (foundOrder.client_id !== client_id)
      throw new AppError('You can only cancel your own orders.', 401);

    await ordersRepository.delete(order_id);

    return response.status(204).send();
  }
}

export default OrdersController;
