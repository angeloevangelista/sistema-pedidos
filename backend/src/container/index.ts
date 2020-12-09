import { container } from 'tsyringe';

import IClientsRepository from '../data/repositories/IClientsRepository';
import ClientsRepository from '../infra/typeorm/repositories/ClientsRepository';

import IProductsRepository from '../data/repositories/IProductsRepository';
import ProductsRepository from '../infra/typeorm/repositories/ProductsRepository';

container.registerSingleton<IClientsRepository>(
  'ClientsRepository',
  ClientsRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);
