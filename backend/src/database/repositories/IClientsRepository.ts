import Client from '../entities/client';

export interface ICreateClientDTO {
  name: string;
  email: string;
  password: string;
  telephone: string;
}

interface IClientsRepository {
  index(): Promise<Client[]>;
  create(params: ICreateClientDTO): Promise<Client>;
  findById(client_id: string): Promise<Client | undefined>;
  findByEmail(client_email: string): Promise<Client | undefined>;
  update(client: Client): Promise<Client>;
  delete(client_id: string): Promise<void>;
}

export default IClientsRepository;
