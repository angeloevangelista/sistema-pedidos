import { EntitySchema } from 'typeorm';

import ClientType from '../../../data/entities/client';

export const ClientEntity = new EntitySchema<ClientType>({
  name: 'client',
  tableName: 'clients',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: true,
      unique: true,
      nullable: false,
    },
    name: {
      type: String,
      length: 100,
      nullable: false,
    },
    email: {
      type: String,
      length: 100,
      nullable: false,
    },
    password: {
      type: String,
      length: 100,
      nullable: false,
    },
    telephone: {
      type: String,
      length: 30,
      nullable: true,
    },
    active: {
      type: Boolean,
      default: true,
      nullable: false,
    },
    created_at: {
      type: Date,
      default: new Date(),
      nullable: false,
    },
    updated_at: {
      type: Date,
      default: new Date(),
      nullable: false,
    },
  },
  relations: {
    orders: {
      type: 'one-to-many',
      target: 'order',
      inverseSide: 'client',
    },
    products: {
      type: 'one-to-many',
      target: 'product',
      inverseSide: 'client',
    },
  },
});

export default ClientEntity;
