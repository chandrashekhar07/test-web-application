import { Module } from '@nestjs/common';
import { CommonModule } from '../common';
import { CountryModule } from '../country/country.module';
import { ProductModule } from '../product/product.module';
import { SalesModule } from '../sales/sales.module';
import { TaskController } from './controller/task.controller';
import { ImportDataService } from './service/import-data.service';
import { TasksService } from './service/tasks.service';

@Module({
  imports: [CommonModule, ProductModule, CountryModule, SalesModule],
  controllers: [TaskController],
  providers: [ImportDataService, TasksService]
})
export class TaskModule {}
