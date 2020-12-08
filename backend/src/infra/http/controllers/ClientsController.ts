import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { IUpdateClientDTO } from '../../../data/repositories/IClientsRepository';

import AppError from '../../../errors/AppError';
import ClientsRepository from '../../typeorm/repositories/ClientsRepository';

class ClientsController {
  async find(request: Request, response: Response) {
    const clientsRepository = new ClientsRepository();
    const { id: client_id } = request.client;

    const client = await clientsRepository.findById(client_id);

    if (!client) {
      throw new AppError('Client not found.');
    }

    return response.json(client);
  }

  async create(request: Request, response: Response) {
    const clientsRepository = new ClientsRepository();

    const { name, email, password, telephone } = request.body;

    const checkIfEmailIsInUse = await clientsRepository.findByEmail(email);

    if (checkIfEmailIsInUse) {
      throw new AppError('Email already used.');
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const client = await clientsRepository.create({
      email,
      name,
      password: hashedPassword,
      telephone,
    });

    return response.status(201).json(client);
  }

  async update(request: Request, response: Response) {
    const clientsRepository = new ClientsRepository();

    const { id: client_id } = request.client;
    const { name, email, old_password, new_password, telephone } = request.body;

    const foundClient = await clientsRepository.findById(client_id);

    if (!foundClient) {
      throw new AppError('Client not found.');
    }

    const clientData: IUpdateClientDTO = {
      name,
      email,
      telephone,
      client_id,
      new_password,
      old_password,
    };

    if (email !== foundClient.email) {
      const checkIfEmailIsInUse = await clientsRepository.findByEmail(email);

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
    }

    const client = await clientsRepository.update(client_id, clientData);

    return response.status(200).json(client);
  }

  async destroy(request: Request, response: Response) {
    const clientsRepository = new ClientsRepository();

    const { id: client_id } = request.client;

    const foundClient = await clientsRepository.findById(client_id);

    if (!foundClient) {
      throw new AppError('Client not found.');
    }

    await clientsRepository.delete(client_id);

    return response.status(204).send();
  }
}

export default ClientsController;
