import { inject, injectable } from 'tsyringe';

import AppError from '../../errors/AppError';

import ProductType from '../../data/entities/product';
import IProductsRepository from '../../data/repositories/IProductsRepository';
import IClientsRepository from '../../data/repositories/IClientsRepository';
import IListStockProductsDTO from '../../data/dtos/products/IListStockProductsDTO';

@injectable()
class ListStockProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute({
    client_id,
    product_name = '',
  }: IListStockProductsDTO): Promise<ProductType[]> {
    const foundClient = await this.clientsRepository.findById(client_id);

    if (!foundClient) throw new AppError('Client not found');

    const products = await this.productsRepository.listByClientId(
      client_id,
      product_name,
    );

    return products;
  }
}

export default ListStockProductsService;
