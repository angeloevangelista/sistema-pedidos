import { getRepository, Repository } from 'typeorm';

import AppError from '../../../errors/AppError';
import OrderType from '../../entities/order';
import OrderEntity from '../entities/order';
import IOrdersRepository, {
  ICreateOrderDTO,
} from '../../repositories/IOrdersRepository';

class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<OrderType>;

  constructor() {
    this.ormRepository = getRepository<OrderType>(OrderEntity);
  }

  async create({
    amount,
    discount,
    client_id,
    product_id,
  }: ICreateOrderDTO): Promise<OrderType> {
    const order = this.ormRepository.create({
      amount,
      discount,
      client_id,
      product_id,
    });

    await this.ormRepository.save(order);

    return order;
  }

  async findById(order_id: string): Promise<OrderType | undefined> {
    const order = await this.ormRepository.findOne(order_id, {
      where: {
        active: true,
      },
    });

    return order;
  }

  async list(): Promise<OrderType[]> {
    const orders = await this.ormRepository.find({
      where: {
        active: true,
      },
    });

    return orders;
  }

  async listByProductId(product_id: string): Promise<OrderType[]> {
    const orders = await this.ormRepository.find({
      where: {
        active: true,
        product_id,
      },
    });

    return orders;
  }

  async listByClientId(client_id: string): Promise<OrderType[]> {
    const orders = await this.ormRepository.find({
      where: {
        active: true,
        client_id,
      },
    });

    return orders;
  }

  async delete(order_id: string): Promise<void> {
    const foundOrder = await this.findById(order_id);

    if (!foundOrder) throw new AppError('Order not found.');

    await this.ormRepository.save({ ...foundOrder, active: false });
  }
}

export default OrdersRepository;
