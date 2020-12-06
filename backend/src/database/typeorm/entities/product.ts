import { EntitySchema } from 'typeorm';

import ProductType from '../../entities/product';

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
});

export default ProductEntity;
