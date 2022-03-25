import { Injectable } from '@nestjs/common';
import { CountryService } from '../../country/service/country.service';
import { ProductService } from '../../product/service/product.service';
import { SalesService } from '../../sales/service/sales.service';

@Injectable()
export class TasksService {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public constructor(
        private readonly salesService: SalesService,
        private readonly productService: ProductService,
        private readonly countryService: CountryService
    ) {}

    // eslint-disable-next-line @typescript-eslint/ban-types
    public async listTotalSalesByProduct(): Promise<{}> {
        const sales = await this.salesService.findAll();
        const products = await this.productService.findAll();
        const productsSales = products.map((product) => {
            const productSales = sales.filter((sale) => sale.product.id === product.id);
            const totalSales = productSales.reduce((acc, curr) => acc + curr.sale, 0);
            return {
                name: product.name,
                id: product.id,
                totalSales
            };
        });
        return productsSales;
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    public async topAndBottom3CountriesBySales(): Promise<{ top: {}; bottom: {} }> {
        const sales = await this.salesService.findAll();
        const salesByCountry = sales.reduce((acc, curr) => {
            if (!acc[curr.country.id]) {
                acc[curr.country.id] = 0;
            }
            acc[curr.country.id] += curr.sale;
            return acc;
        }, {});
        const countries = await this.countryService.findAll();
        const result = {};
        for (const country of countries) {
            result[country.name] = salesByCountry[country.id];
        }
        const top3 = Object.keys(result).sort((a, b) => result[b] - result[a]);
        const top3Countries = {};
        for (let i = 0; i < 3; i++) {
            top3Countries[top3[i]] = result[top3[i]];
        }
        const bottom3 = Object.keys(result).sort((a, b) => result[a] - result[b]);
        const bottom3Countries = {};
        for (let i = 0; i < 3; i++) {
            bottom3Countries[bottom3[i]] = result[bottom3[i]];
        }

        return {
            top: top3Countries,
            bottom: bottom3Countries
        };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async q5(): Promise<any> {
        const sales = await this.salesService.findAll();
        const salesByYearAndProduct = sales.reduce((acc, curr) => {
            if (!acc[curr.product.name]) {
                acc[curr.product.name] = {};
            }
            if (!acc[curr.product.name][curr.year]) {
                acc[curr.product.name][curr.year] = 0;
            }
            acc[curr.product.name][curr.year] += curr.sale;
            return acc;
        }, {});
        const products = Object.keys(salesByYearAndProduct);
        const result = {};
        for (const product of products) {
            result[product] = {};
            const years = Object.keys(salesByYearAndProduct[product]);
            for (const year of years) {
                result[product][year] = salesByYearAndProduct[product][year];
            }
        }
        // eslint-disable-next-line no-console
        console.log('result is', result);
        const finalResult = {};
        for (const productKey in result) {
            let counterForLowerInterval = 0;
            let counterForUpperInterval = 0;
            for (const yearKey in result[productKey]) {
                if (!finalResult[productKey]) {
                    finalResult[productKey] = {};
                }
                if (Number(yearKey) <= 2010) {
                    if (!finalResult[productKey]['2007-2010']) {
                        finalResult[productKey]['2007-2010'] = 0;
                    }

                    if (result[productKey][yearKey] > 0) {
                        counterForLowerInterval++;
                    }

                    finalResult[productKey]['2007-2010'] += result[productKey][yearKey];
                } else {
                    if (!finalResult[productKey]['2011-2014']) {
                        finalResult[productKey]['2011-2014'] = 0;
                    }

                    if (result[productKey][yearKey] > 0) {
                        counterForUpperInterval++;
                    }

                    finalResult[productKey]['2011-2014'] += result[productKey][yearKey];
                }
            }

            finalResult[productKey]['2007-2010'] =
                finalResult[productKey]['2007-2010'] / counterForLowerInterval;
            finalResult[productKey]['2011-2014'] =
                finalResult[productKey]['2011-2014'] / counterForUpperInterval;
        }
        return finalResult;
    }
}
