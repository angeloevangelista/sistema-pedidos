import { inject, injectable } from 'tsyringe';

import AppError from '../../errors/AppError';
import OrderType from '../../data/entities/order';

import IOrdersRepository from '../../data/repositories/IOrdersRepository';
import IClientsRepository from '../../data/repositories/IClientsRepository';
import IFindOrderDTO from '../../data/dtos/orders/IFindOrderDTO';

@injectable()
class FindOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute({
    client_id,
    order_id,
  }: IFindOrderDTO): Promise<OrderType> {
    const foundClient = await this.clientsRepository.findById(client_id);

    if (!foundClient) throw new AppError('Client not found.');

    const order = await this.ordersRepository.findById(order_id);

    if (!order) throw new AppError('Order not found.');

    if (order.client_id !== foundClient.id)
      throw new AppError('You can only view your own orders.', 401);

    return order;
  }
}

export default FindOrderService;
