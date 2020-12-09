import { inject, injectable } from 'tsyringe';

import AppError from '../../errors/AppError';
import IDeleteProductDTO from '../../data/dtos/products/IDeleteProductDTO';
import IProductsRepository from '../../data/repositories/IProductsRepository';
import IClientsRepository from '../../data/repositories/IClientsRepository';

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute({
    client_id,
    product_id,
  }: IDeleteProductDTO): Promise<void> {
    const foundProduct = await this.productsRepository.findById(product_id);

    if (!foundProduct) throw new AppError('Product not found.');

    const foundClient = await this.clientsRepository.findById(client_id);

    if (!foundClient) throw new AppError('Client not found');

    if (foundProduct.client_id !== foundClient.id)
      throw new AppError('You can only remove your own products.', 401);

    await this.productsRepository.delete(product_id);
  }
}

export default DeleteProductService;
