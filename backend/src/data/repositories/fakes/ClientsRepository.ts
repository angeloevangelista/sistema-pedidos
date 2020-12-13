import { uuid } from 'uuidv4';
import bcrypt from 'bcrypt';

import AppError from '../../../errors/AppError';
import ClientType from '../../entities/client';
import IClientsRepository, { ICreateClientParams } from '../IClientsRepository';

class ClientsRepository implements IClientsRepository {
  private clients: ClientType[];

  constructor() {
    this.clients = [];
  }

  async create({
    email,
    name,
    password,
    telephone,
  }: ICreateClientParams): Promise<ClientType> {
    const encryptedPassword = await bcrypt.hash(password, 8);

    const client: ClientType = {
      id: uuid(),
      active: true,
      email,
      name,
      orders: [],
      password: encryptedPassword,
      products: [],
      telephone,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.clients.push(client);

    return client;
  }

  async findById(client_id: string): Promise<ClientType | undefined> {
    const client = this.clients.find((cli) => cli.id === client_id);

    return client;
  }

  async findByEmail(client_email: string): Promise<ClientType | undefined> {
    const client = this.clients.find((cli) => cli.email === client_email);

    return client;
  }

  async update(
    client_id: string,
    client: Partial<ClientType>,
  ): Promise<ClientType> {
    const foundClient = await this.findById(client_id);

    if (!foundClient) throw new AppError('Client not found.');

    this.clients.forEach((storedClient) => {
      if (foundClient === storedClient) {
        // eslint-disable-next-line no-param-reassign
        storedClient = {
          ...storedClient,
          ...client,
        };
      }
    });

    return foundClient;
  }

  async delete(client_id: string): Promise<void> {
    const foundClient = await this.findById(client_id);

    if (!foundClient) throw new AppError('Client not found.');

    const indexOfClient = this.clients.indexOf(foundClient);

    this.clients.splice(indexOfClient, 1);
  }
}

export default ClientsRepository;
