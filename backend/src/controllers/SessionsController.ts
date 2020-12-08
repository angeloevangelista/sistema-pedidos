import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import authConfig from '../config/auth';

import AppError from '../errors/AppError';
import ClientsRepository from '../database/typeorm/repositories/ClientsRepository';

class SessionsController {
  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const clientsRepository = new ClientsRepository();

    const client = await clientsRepository.findByEmail(email);

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

    return response.status(201).json({
      client,
      token,
    });
  }
}

export default SessionsController;
