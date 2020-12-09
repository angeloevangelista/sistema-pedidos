import { container } from 'tsyringe';
import { Request, Response } from 'express';

import AuthenticateClientService from '../../../services/clients/AuthenticateClientService';

class SessionsController {
  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateClient = container.resolve(AuthenticateClientService);

    const { client, token } = await authenticateClient.execute({
      email,
      password,
    });

    return response.status(201).json({
      client,
      token,
    });
  }
}

export default SessionsController;
