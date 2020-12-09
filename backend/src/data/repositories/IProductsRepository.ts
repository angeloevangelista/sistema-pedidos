import ProductType from '../entities/product';

export interface ICreateProductParams {
  client_id: string;
  name: string;
  price: number;
}

interface IProductsRepository {
  update(
    product_id: string,
    product: Partial<ProductType>,
  ): Promise<ProductType>;
  list(product_name?: string): Promise<ProductType[]>;
  listByClientId(
    client_id: string,
    product_name?: string,
  ): Promise<ProductType[]>;
  findById(product_id: string): Promise<ProductType | undefined>;
  create(params: ICreateProductParams): Promise<ProductType>;
  delete(product_id: string): Promise<void>;
}

export default IProductsRepository;
