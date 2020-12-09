import { inject, injectable } from 'tsyringe';

import AppError from '../../errors/AppError';
import ProductType from '../../data/entities/product';
import IProductsRepository from '../../data/repositories/IProductsRepository';

@injectable()
class FindProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(product_id: string): Promise<ProductType> {
    const product = await this.productsRepository.findById(product_id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    return product;
  }
}

export default FindProductService;
