import { getRepository, Repository, ILike } from 'typeorm';

import AppError from '../../../errors/AppError';
import ProductType from '../../entities/product';
import ProductEntity from '../entities/product';
import IProductsRepository, {
  ICreateProductDTO,
} from '../../repositories/IProductsRepository';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<ProductType>;

  constructor() {
    this.ormRepository = getRepository<ProductType>(ProductEntity);
  }

  async update(
    product_id: string,
    product: Partial<ProductType>,
  ): Promise<ProductType> {
    const existingProduct = await this.findById(product_id);

    if (!existingProduct) throw new AppError('Product not found.');

    return this.ormRepository.save({
      ...existingProduct,
      ...product,
    });
  }

  async list(product_name = ''): Promise<ProductType[]> {
    const products = await this.ormRepository.find({
      where: {
        active: true,
        name: ILike(`%${product_name}%`),
      },
    });

    return products;
  }

  async findById(product_id: string): Promise<ProductType | undefined> {
    const product = await this.ormRepository.findOne({
      where: {
        active: true,
        id: product_id,
      },
    });

    return product;
  }

  async create({ name, price }: ICreateProductDTO): Promise<ProductType> {
    const product = this.ormRepository.create({
      name,
      price,
    });

    await this.ormRepository.save(product);

    return product;
  }

  async delete(product_id: string): Promise<void> {
    const product = await this.findById(product_id);

    if (!product) throw new AppError('Product not found');

    await this.ormRepository.save({
      ...product,
      active: false,
    });
  }
}

export default ProductsRepository;
