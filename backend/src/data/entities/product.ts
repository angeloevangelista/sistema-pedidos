import Client from './client';

type Product = {
  id: string;
  name: string;
  price: number;

  client_id: string;
  client: Client;

  active: boolean;
  created_at: Date;
  updated_at: Date;
};

export default Product;
