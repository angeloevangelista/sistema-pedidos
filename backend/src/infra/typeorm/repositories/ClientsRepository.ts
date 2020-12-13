import { getRepository, Repository } from 'typeorm';

import AppError from '../../../errors/AppError';
import ClientType from '../../../data/entities/client';
import ClientEntity from '../entities/client';
import IClientsRepository, {
  ICreateClientParams,
} from '../../../data/repositories/IClientsRepository';

class ClientsRepository implements IClientsRepository {
  private ormRepository: Repository<ClientType>;

  constructor() {
    this.ormRepository = getRepository<ClientType>(ClientEntity);
  }

  async create({
    name,
    email,
    password,
    telephone,
  }: ICreateClientParams): Promise<ClientType> {
    const client = this.ormRepository.create({
      name,
      email,
      telephone,
      password,
    });

    await this.ormRepository.save(client);

    return client;
  }

  async findById(client_id: string): Promise<ClientType | undefined> {
    const client = await this.ormRepository.findOne({
      where: {
        active: true,
        id: client_id,
      },
    });

    return client;
  }

  async findByEmail(client_email: string): Promise<ClientType | undefined> {
    const client = await this.ormRepository.findOne({
      where: {
        active: true,
        email: client_email,
      },
    });

    return client;
  }

  async update(
    client_id: string,
    client: Partial<ClientType>,
  ): Promise<ClientType> {
    const existingClient = await this.findById(client_id);

    if (!existingClient) throw new AppError('Client not found.');

    return this.ormRepository.save({
      ...existingClient,
      ...client,
    });
  }

  async delete(client_id: string): Promise<void> {
    const existingClient = await this.findById(client_id);

    if (!existingClient) throw new AppError('Client not found.');

    await this.ormRepository.save({
      ...existingClient,
      active: false,
    });
  }
}

export default ClientsRepository;
