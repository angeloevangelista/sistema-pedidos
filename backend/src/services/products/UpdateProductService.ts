import { inject, injectable } from 'tsyringe';

import AppError from '../../errors/AppError';
import ProductType from '../../data/entities/product';
import IUpdateProductDTO from '../../data/dtos/products/IUpdateProductDTO';
import IProductsRepository from '../../data/repositories/IProductsRepository';
import IClientsRepository from '../../data/repositories/IClientsRepository';

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute({
    product_id,
    client_id,
    name,
    price,
  }: IUpdateProductDTO): Promise<ProductType> {
    const foundProduct = await this.productsRepository.findById(product_id);

    if (!foundProduct) throw new AppError('Product not found.');

    const foundClient = await this.clientsRepository.findById(client_id);

    if (!foundClient) throw new AppError('Client not found');

    const product = await this.productsRepository.update(product_id, {
      name,
      price,
    });

    return product;
  }
}

export default UpdateProductService;
