import { inject, injectable } from 'tsyringe';

import AppError from '../../errors/AppError';
import IClientsRepository from '../../data/repositories/IClientsRepository';

@injectable()
class DeleteClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute(client_id: string): Promise<void> {
    const foundClient = await this.clientsRepository.findById(client_id);

    if (!foundClient) {
      throw new AppError('Client not found.');
    }

    await this.clientsRepository.delete(client_id);
  }
}

export default DeleteClientService;
