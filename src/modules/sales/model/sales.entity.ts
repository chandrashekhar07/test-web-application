import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/model/base.entity';
import { CountryEntity } from '../../country/model/country.entity';
import { ProductEntity } from '../../product/model/product.entity';

@Entity('sales')
export class SalesEntity extends BaseEntity {
    @ManyToOne(() => CountryEntity, (country) => country.sales, { eager: true })
    country: CountryEntity;

    @Column({ nullable: false })
    year: number;

    @ManyToOne(() => ProductEntity, (product) => product.sales, { eager: true })
    product: ProductEntity;

    @Column({ nullable: false })
    sale: number;
}
