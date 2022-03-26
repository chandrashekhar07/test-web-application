import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../model/product.entity';

@Injectable()
export class ProductService {
  public constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ) {}

  public async findOrSave(name: string): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({ name: name });
    if (product) {
      return product;
    } else {
      const newProduct = new ProductEntity();
      newProduct.name = name;
      return this.productRepository.save(newProduct);
    }
  }

  public async findOne(id: number): Promise<ProductEntity | undefined> {
    return this.productRepository.findOneOrFail(id);
  }

  public async findProductByName(name: string): Promise<ProductEntity | undefined> {
    return this.productRepository.findOneOrFail({ name: name });
  }

  public async findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }
}
