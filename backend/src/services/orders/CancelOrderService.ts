import { inject, injectable } from 'tsyringe';

import AppError from '../../errors/AppError';

import ICancelOrderDTO from '../../data/dtos/orders/ICancelOrderDTO';
import IOrdersRepository from '../../data/repositories/IOrdersRepository';
import IClientsRepository from '../../data/repositories/IClientsRepository';

@injectable()
class CancelOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute({
    client_id,
    order_id,
  }: ICancelOrderDTO): Promise<void> {
    const foundClient = await this.clientsRepository.findById(client_id);

    if (!foundClient) throw new AppError('Client not found.');

    const foundOrder = await this.ordersRepository.findById(order_id);

    if (!foundOrder) throw new AppError('Order not found.');

    if (foundOrder.client_id !== foundClient.id)
      throw new AppError('You can only cancel your own orders.', 401);

    await this.ordersRepository.delete(order_id);
  }
}

export default CancelOrderService;
