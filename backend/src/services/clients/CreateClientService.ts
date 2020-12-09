import { injectable, inject } from 'tsyringe';
import bcrypt from 'bcrypt';

import AppError from '../../errors/AppError';
import ClientType from '../../data/entities/client';

import IClientsRepository from '../../data/repositories/IClientsRepository';
import ICreateClientDTO from '../../data/dtos/clients/ICreateClientDTO';

@injectable()
class CreateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute({
    email,
    name,
    password,
    telephone,
  }: ICreateClientDTO): Promise<ClientType> {
    const checkEmailIsUsed = await this.clientsRepository.findByEmail(email);

    if (checkEmailIsUsed) {
      throw new AppError('Email already used.');
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const client = await this.clientsRepository.create({
      email,
      name,
      password: hashedPassword,
      telephone,
    });

    return client;
  }
}

export default CreateClientService;
