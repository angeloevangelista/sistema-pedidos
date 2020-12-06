import { getRepository, Repository } from 'typeorm';

import AppError from '../../../errors/AppError';
import ClientType from '../../entities/client';
import ClientEntity from '../entities/client';
import IClientsRepository, {
  ICreateClientDTO,
} from '../../repositories/IClientsRepository';

class ClientsRepository implements IClientsRepository {
  private ormRepository: Repository<ClientType>;

  constructor() {
    this.ormRepository = getRepository(ClientEntity);
  }

  async index(): Promise<ClientType[]> {
    const clients = await this.ormRepository.find({
      where: {
        active: true,
      },
    });

    return clients;
  }

  async create({
    name,
    email,
    telephone,
  }: ICreateClientDTO): Promise<ClientType> {
    const client = this.ormRepository.create({
      name,
      email,
      telephone,
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

  async update(client: ClientType): Promise<ClientType> {
    const existingClient = await this.findById(client.id);

    if (!existingClient) throw new AppError('Client not found.');

    await this.ormRepository.update(existingClient, client);

    return client;
  }

  async delete(client_id: string): Promise<void> {
    const existingClient = await this.findById(client_id);

    if (!existingClient) throw new AppError('Client not found.');

    await this.ormRepository.update(existingClient, {
      active: false,
    });
  }
}

export default ClientsRepository;
