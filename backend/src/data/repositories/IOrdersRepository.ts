import OrderType from '../entities/order';

export interface ICreateOrderDTO {
  client_id: string;
  product_id: string;
  amount: number;
  discount: number;
}

interface IOrdersRepository {
  create(params: ICreateOrderDTO): Promise<OrderType>;
  findById(order_id: string): Promise<OrderType | undefined>;
  list(): Promise<OrderType[]>;
  listByProductId(product_id: string): Promise<OrderType[]>;
  listByClientId(client_id: string): Promise<OrderType[]>;
  delete(order_id: string): Promise<void>;
}

export default IOrdersRepository;
