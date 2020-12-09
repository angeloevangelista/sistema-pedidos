import { inject, injectable } from 'tsyringe';

import ProductType from '../../data/entities/product';
import IProductsRepository from '../../data/repositories/IProductsRepository';

@injectable()
class ListProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(product_name = ''): Promise<ProductType[]> {
    const products = await this.productsRepository.list(product_name);

    return products;
  }
}

export default ListProductsService;
