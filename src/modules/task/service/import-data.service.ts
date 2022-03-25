/* eslint-disable no-console */
import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { OriginalSalesObject, ModifiedSalesObject } from '../../common/model/interface';
import { LoggerService } from '../../common/provider';
import { CountryService } from '../../country/service/country.service';
import { ProductService } from '../../product/service/product.service';
import { SalesEntity } from '../../sales/model/sales.entity';
import { SalesService } from '../../sales/service/sales.service';

@Injectable()
export class ImportDataService {
    public constructor(
        private readonly logger: LoggerService,
        private readonly countryService: CountryService,
        private readonly productService: ProductService,
        private readonly salesService: SalesService
    ) {}

    public async importDataFromJsonFileToDB(): Promise<string> {
        this.logger.info('import data from json file');
        const saleData = JSON.parse(
            readFileSync('data.json', 'utf-8')
        ) as OriginalSalesObject[];
        const modifiedSalesData: ModifiedSalesObject[] = [];

        for (let counter = 0; counter < saleData.length; counter++) {
            const country = await this.countryService
                .findOrSave(saleData[counter].country)
                .catch((error) => {
                    this.logger.error('Cant find or save country', error);
                });
            const product = await this.productService
                .findOrSave(saleData[counter].petroleum_product)
                .catch((error) => {
                    this.logger.error('Cant find or save product', error);
                });
            if (country && product) {
                modifiedSalesData.push({
                    ...saleData[counter],
                    country: country.id,
                    petroleum_product: product.id
                });
            }
        }
        await this.salesService.deleteAll();
        modifiedSalesData.map(async (modifiedSale) => {
            const country = await this.countryService.findOne(modifiedSale.country);
            const product = await this.productService.findOne(
                modifiedSale.petroleum_product
            );
            if (country && product) {
                const sale = new SalesEntity();
                sale.country = country;
                sale.sale = modifiedSale.sale;
                sale.year = modifiedSale.year;
                sale.product = product;
                await this.salesService.save(sale);
            }
        });

        return 'success';
    }
}
