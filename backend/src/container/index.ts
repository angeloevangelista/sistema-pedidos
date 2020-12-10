import { container } from 'tsyringe';

import IClientsRepository from '../data/repositories/IClientsRepository';
import ClientsRepository from '../infra/typeorm/repositories/ClientsRepository';

import IProductsRepository from '../data/repositories/IProductsRepository';
import ProductsRepository from '../infra/typeorm/repositories/ProductsRepository';

import IOrdersRepository from '../data/repositories/IOrdersRepository';
import OrdersRepository from '../infra/typeorm/repositories/OrdersRepository';

container.registerSingleton<IClientsRepository>(
  'ClientsRepository',
  ClientsRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);
