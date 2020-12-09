import { inject, injectable } from 'tsyringe';

import AppError from '../../errors/AppError';
import ProductType from '../../data/entities/product';
import ICreateProductDTO from '../../data/dtos/products/ICreateProductDTO';
import IProductsRepository from '../../data/repositories/IProductsRepository';
import IClientsRepository from '../../data/repositories/IClientsRepository';

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute({
    client_id,
    name,
    price,
  }: ICreateProductDTO): Promise<ProductType> {
    const foundClient = await this.clientsRepository.findById(client_id);

    if (!foundClient) throw new AppError('Client not found');

    const product = await this.productsRepository.create({
      name,
      price,
      client_id,
    });

    return product;
  }
}

export default CreateProductService;
