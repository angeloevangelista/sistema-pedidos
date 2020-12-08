import { EntitySchema } from 'typeorm';

import ProductType from '../../../data/entities/product';

export const ProductEntity = new EntitySchema<ProductType>({
  name: 'product',
  tableName: 'products',
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
    active: {
      type: Boolean,
      default: true,
      nullable: false,
    },
    price: {
      type: Number,
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
    client_id: {
      type: 'uuid',
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
    client: {
      type: 'one-to-one',
      target: 'client',
      joinColumn: { name: 'client_id', referencedColumnName: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  },
});

export default ProductEntity;
