import { inject, injectable } from 'tsyringe';

import AppError from '../../errors/AppError';
import OrderType from '../../data/entities/order';

import IOrdersRepository from '../../data/repositories/IOrdersRepository';
import IClientsRepository from '../../data/repositories/IClientsRepository';

@injectable()
class ListOrdersService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute(client_id: string): Promise<OrderType[]> {
    const foundClient = await this.clientsRepository.findById(client_id);

    if (!foundClient) throw new AppError('Client not found.');

    const orders = await this.ordersRepository.listByClientId(client_id);

    return orders;
  }
}

export default ListOrdersService;
