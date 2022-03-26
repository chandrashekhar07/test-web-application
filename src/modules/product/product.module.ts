import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common';
import { ProductController } from './controller/product.controller';
import { ProductEntity } from './model/product.entity';
import { ProductService } from './service/product.service';

@Module({
  imports: [CommonModule, TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule {}
