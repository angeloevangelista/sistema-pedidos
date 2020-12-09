import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateClientService from '../../../services/clients/CreateClientService';
import UpdateClientService from '../../../services/clients/UpdateClientService';
import FindClientService from '../../../services/clients/FindClientService';
import DeleteClientService from '../../../services/clients/DeleteClientService';

class ClientsController {
  async find(request: Request, response: Response) {
    const { id: client_id } = request.client;

    const findClient = container.resolve(FindClientService);

    const client = await findClient.execute(client_id);

    return response.json(client);
  }

  async create(request: Request, response: Response) {
    const { name, email, password, telephone } = request.body;

    const createClient = container.resolve(CreateClientService);

    const client = await createClient.execute({
      name,
      email,
      password,
      telephone,
    });

    return response.status(201).json(client);
  }

  async update(request: Request, response: Response) {
    const { id: client_id } = request.client;
    const { name, email, old_password, new_password, telephone } = request.body;

    const updateClient = container.resolve(UpdateClientService);

    const client = await updateClient.execute({
      client_id,
      email,
      name,
      new_password,
      old_password,
      telephone,
    });

    return response.status(200).json(client);
  }

  async destroy(request: Request, response: Response) {
    const { id: client_id } = request.client;

    const deleteClient = container.resolve(DeleteClientService);

    await deleteClient.execute(client_id);

    return response.status(204).send();
  }
}

export default ClientsController;
