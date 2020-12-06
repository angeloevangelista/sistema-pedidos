import { EntitySchema } from 'typeorm';

import OrderType from '../../entities/order';

export const OrderEntity = new EntitySchema<OrderType>({
  name: 'order',
  tableName: 'orders',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: true,
      unique: true,
      nullable: false,
    },
    amount: {
      type: Number,
      nullable: false,
    },
    discount: {
      type: Number,
      default: 0,
      nullable: false,
      transformer: {
        to(value) {
          return value;
        },
        from(value) {
          return parseFloat(value);
        },
      },
    },
    active: {
      type: Boolean,
      default: true,
      nullable: false,
    },
    canceled_at: {
      type: Date,
      default: new Date(),
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
    client_id: {
      type: 'uuid',
      nullable: true,
    },
    product_id: {
      type: 'uuid',
      nullable: true,
    },
  },
  relations: {
    client: {
      target: 'client',
      type: 'one-to-one',
      joinColumn: { name: 'client_id', referencedColumnName: 'id' },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
    product: {
      target: 'product',
      type: 'one-to-one',
      joinColumn: { name: 'product_id', referencedColumnName: 'id' },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
  },
});

export default OrderEntity;
