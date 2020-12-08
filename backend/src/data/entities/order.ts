import Client from './client';
import Product from './product';

type Order = {
  id: string;

  client_id: string;
  client: Client;

  product_id: string;
  product: Product;

  amount: number;
  discount: number;

  active: boolean;
  created_at: Date;
  updated_at: Date;
  canceled_at: Date | null;
};

export default Order;
