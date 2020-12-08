import Order from './order';
import Product from './product';

type Client = {
  id: string;
  name: string;
  email: string;
  password: string;
  telephone: string;

  orders: Order[];
  products: Product[];

  active: boolean;
  created_at: Date;
  updated_at: Date;
};

export default Client;
