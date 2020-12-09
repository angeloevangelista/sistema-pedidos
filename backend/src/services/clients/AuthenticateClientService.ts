import { injectable, inject } from 'tsyringe';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import authConfig from '../../config/auth';

import AppError from '../../errors/AppError';
import ClientType from '../../data/entities/client';

import IClientsRepository from '../../data/repositories/IClientsRepository';
import IAuthenticateClientDTO from '../../data/dtos/clients/IAuthenticateClientDTO';

interface IAuthenticateClientResponse {
  client: ClientType;
  token: string;
}

@injectable()
class AuthenticateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute({
    email,
    password,
  }: IAuthenticateClientDTO): Promise<IAuthenticateClientResponse> {
    const client = await this.clientsRepository.findByEmail(email);

    if (!client) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordsMatch = await bcrypt.compare(password, client.password);

    if (!passwordsMatch) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = jwt.sign({}, secret, {
      subject: client.id,
      expiresIn,
    });

    return {
      client,
      token,
    };
  }
}

export default AuthenticateClientService;
