import { container } from 'tsyringe';

import IClientsRepository from '../data/repositories/IClientsRepository';
import ClientsRepository from '../infra/typeorm/repositories/ClientsRepository';

container.registerSingleton<IClientsRepository>(
  'ClientsRepository',
  ClientsRepository,
);
