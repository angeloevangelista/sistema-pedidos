import AppError from '../../errors/AppError';
import ClientType from '../../data/entities/client';
import IClientsRepository from '../../data/repositories/IClientsRepository';

class FindClientService {
  constructor(private clientsRepository: IClientsRepository) {}

  public async execute(client_id: string): Promise<ClientType> {
    const client = await this.clientsRepository.findById(client_id);

    if (!client) {
      throw new AppError('Client not found.');
    }

    return client;
  }
}

export default FindClientService;
