import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoggerService } from '../../common/provider';
import { ImportDataService } from '../service/import-data.service';
import { TasksService } from '../service/tasks.service';

@ApiTags('task')
@Controller('task')
export class TaskController {
  public constructor(
    private readonly logger: LoggerService,
    private readonly importDataService: ImportDataService,
    private readonly tasksService: TasksService
  ) {}

  @Post('import-data-from-json-to-db')
  public async importDataToFromJsonDb(): Promise<string> {
    this.logger.info('import data from json file api called');
    return this.importDataService.importDataFromJsonFileToDB();
  }

  @Get('sales-of-each-product')
  // eslint-disable-next-line @typescript-eslint/ban-types
  public async totalSalesOfPetroleum(): Promise<{}> {
    this.logger.info('total sales of each product api called');
    const total = await this.tasksService.listTotalSalesByProduct();
    return { total };
  }

  @Get('top-and-buttom-3-countries-by-sales')
  public async topAndButtom3CountriesBySales(): Promise<{
    // eslint-disable-next-line @typescript-eslint/ban-types
    top: {};
    // eslint-disable-next-line @typescript-eslint/ban-types
    bottom: {};
  }> {
    this.logger.info('top and buttom 3 countries by sales api called');
    const topAndButtom3CountriesBySales =
      await this.tasksService.topAndBottom3CountriesBySales();

    return {
      top: topAndButtom3CountriesBySales.top,
      bottom: topAndButtom3CountriesBySales.bottom
    };
  }

  @Get('list-sales-of-each-product-by-4-year-interval')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async listSalesOfProductByYear(): Promise<any> {
    this.logger.info('list sales of each product by 4 year interval api called');
    return this.tasksService.q5();
  }
}
