import ClientType from '../entities/client';

export interface ICreateClientDTO {
  name: string;
  email: string;
  password: string;
  telephone: string;
}

interface IClientsRepository {
  index(): Promise<ClientType[]>;
  create(params: ICreateClientDTO): Promise<ClientType>;
  findById(client_id: string): Promise<ClientType | undefined>;
  findByEmail(client_email: string): Promise<ClientType | undefined>;
  update(client_id: string, client: Partial<ClientType>): Promise<ClientType>;
  delete(client_id: string): Promise<void>;
}

export default IClientsRepository;
