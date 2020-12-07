import Order from './order';

type Client = {
  id: string;
  name: string;
  email: string;
  password: string;
  telephone: string;

  orders: Order[];

  active: boolean;
  created_at: Date;
  updated_at: Date;
};

export default Client;
