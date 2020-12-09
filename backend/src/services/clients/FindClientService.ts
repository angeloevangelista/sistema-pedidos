import { inject, injectable } from 'tsyringe';

import AppError from '../../errors/AppError';
import ClientType from '../../data/entities/client';
import IClientsRepository from '../../data/repositories/IClientsRepository';

@injectable()
class FindClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute(client_id: string): Promise<ClientType> {
    const client = await this.clientsRepository.findById(client_id);

    if (!client) {
      throw new AppError('Client not found.');
    }

    return client;
  }
}

export default FindClientService;
