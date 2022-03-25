import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common';
import { SalesController } from './controller/sales.controller';
import { SalesEntity } from './model/sales.entity';
import { SalesService } from './service/sales.service';

@Module({
    imports: [CommonModule, TypeOrmModule.forFeature([SalesEntity])],
    controllers: [SalesController],
    providers: [SalesService],
    exports: [SalesService]
})
export class SalesModule {}
