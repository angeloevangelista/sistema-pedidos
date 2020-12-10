import { inject, injectable } from 'tsyringe';

import AppError from '../../errors/AppError';
import OrderType from '../../data/entities/order';

import IOrdersRepository from '../../data/repositories/IOrdersRepository';
import IClientsRepository from '../../data/repositories/IClientsRepository';
import IProductsRepository from '../../data/repositories/IProductsRepository';
import ICreateOrderDTO from '../../data/dtos/orders/ICreateOrderDTO';

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    client_id,
    product_id,
    amount,
    discount,
  }: ICreateOrderDTO): Promise<OrderType> {
    const clientExists = await this.clientsRepository.findById(client_id);

    if (!clientExists) throw new AppError('Client not found');

    const productExists = await this.productsRepository.findById(product_id);

    if (!productExists) throw new AppError('Product not found');

    const order = await this.ordersRepository.create({
      client_id,
      product_id,
      amount,
      discount,
    });

    return order;
  }
}

export default CreateOrderService;
