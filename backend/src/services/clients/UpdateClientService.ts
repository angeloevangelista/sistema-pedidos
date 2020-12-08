import bcrypt from 'bcrypt';

import AppError from '../../errors/AppError';
import ClientType from '../../data/entities/client';
import IClientsRepository, {
  IUpdateClientDTO,
} from '../../data/repositories/IClientsRepository';

class UpdateClientService {
  constructor(private clientsRepository: IClientsRepository) {}

  public async execute({
    client_id,
    email,
    name,
    new_password,
    old_password,
    telephone,
  }: IUpdateClientDTO): Promise<ClientType> {
    const foundClient = await this.clientsRepository.findById(client_id);

    if (!foundClient) {
      throw new AppError('Client not found.');
    }

    const clientData: Partial<ClientType> = {
      name,
      email,
      telephone,
    };

    if (email !== foundClient.email) {
      const checkIfEmailIsInUse = await this.clientsRepository.findByEmail(
        email,
      );

      if (checkIfEmailIsInUse) throw new AppError('Email already in use.');
    }

    if (old_password) {
      const passwordsMatch = await bcrypt.compare(
        old_password,
        foundClient.password,
      );

      if (!passwordsMatch) {
        throw new AppError("Combination email/password doesn't match.");
      }

      const hashedPassword = await bcrypt.hash(new_password, 8);

      clientData.password = hashedPassword;
    }

    const client = await this.clientsRepository.update(client_id, clientData);

    return client;
  }
}

export default UpdateClientService;
