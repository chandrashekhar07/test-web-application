import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../../product/model/product.entity';
import { SalesEntity } from '../model/sales.entity';

@Injectable()
export class SalesService {
  public constructor(
    @InjectRepository(SalesEntity)
    private readonly salesRepository: Repository<SalesEntity>
  ) {}

  public async save(sales: SalesEntity): Promise<SalesEntity> {
    return this.salesRepository.save(sales);
  }

  public async deleteAll(): Promise<void> {
    await this.salesRepository.clear();
  }

  public async findSalesByProduct(product: ProductEntity): Promise<SalesEntity[]> {
    return this.salesRepository.find({
      product: product
    });
  }

  public async findSalesByCountry(countryId: number): Promise<SalesEntity[]> {
    return this.salesRepository.find({
      where: { countryId: countryId }
    });
  }

  public async findAll(): Promise<SalesEntity[]> {
    return this.salesRepository.find();
  }
}
