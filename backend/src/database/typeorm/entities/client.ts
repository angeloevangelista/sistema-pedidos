import { EntitySchema } from 'typeorm';

import ClientType from '../../entities/client';

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
      target: 'order',
      type: 'one-to-many',
      joinColumn: { name: 'orders', referencedColumnName: 'client_id' },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
  },
});

export default ClientEntity;
