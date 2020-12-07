import OrderType from '../entities/order';

interface IOrdersRepository {
  findById(order_id: string): Promise<OrderType | undefined>;
  list(): Promise<OrderType[]>;
  listByProductId(product_id: string): Promise<OrderType[]>;
  listByClientId(client_id: string): Promise<OrderType[]>;
  delete(order_id: string): Promise<void>;
}

export default IOrdersRepository;
