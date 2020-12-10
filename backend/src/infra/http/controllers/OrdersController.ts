import { Request, Response } from 'express';

import { container } from 'tsyringe';

import FindOrderService from '../../../services/orders/FindOrderService';
import ListOrdersService from '../../../services/orders/ListOrdersService';
import CreateOrderService from '../../../services/orders/CreateOrderService';
import CancelOrderService from '../../../services/orders/CancelOrderService';

class OrdersController {
  async find(request: Request, response: Response) {
    const { order_id } = request.params;
    const { id: client_id } = request.client;

    const findOrder = container.resolve(FindOrderService);

    const order = await findOrder.execute({
      client_id,
      order_id,
    });

    return response.json(order);
  }

  async index(request: Request, response: Response) {
    const { id: client_id } = request.client;

    const listOrders = container.resolve(ListOrdersService);

    const orders = await listOrders.execute(client_id);

    return response.json(orders);
  }

  async create(request: Request, response: Response) {
    const { product_id, amount, discount } = request.body;
    const { id: client_id } = request.client;

    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({
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

    const cancelOrder = container.resolve(CancelOrderService);

    await cancelOrder.execute({
      client_id,
      order_id,
    });

    return response.status(204).send();
  }
}

export default OrdersController;
