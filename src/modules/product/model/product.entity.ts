import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/model/base.entity';
import { SalesEntity } from '../../sales/model/sales.entity';

@Entity('product')
export class ProductEntity extends BaseEntity {
  @Column({ nullable: false, length: 50 })
  name: string;

  @OneToMany(() => SalesEntity, (sales) => sales.product)
  sales: SalesEntity[];
}
