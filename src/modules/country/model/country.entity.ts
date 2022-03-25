import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/model/base.entity';
import { SalesEntity } from '../../sales/model/sales.entity';

@Entity('country')
export class CountryEntity extends BaseEntity {
    @Column({ nullable: false, length: 50 })
    name: string;

    @OneToMany(() => SalesEntity, (sales) => sales.country)
    sales: SalesEntity[];
}
