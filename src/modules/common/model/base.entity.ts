import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    public id: number;

    @CreateDateColumn({ name: 'createdAt' })
    public createdAt: Date;
}
