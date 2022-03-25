import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common';
import { CountryController } from './controller/country.controller';
import { CountryEntity } from './model/country.entity';
import { CountryService } from './service/country.service';

@Module({
    imports: [CommonModule, TypeOrmModule.forFeature([CountryEntity])],
    controllers: [CountryController],
    providers: [CountryService],
    exports: [CountryService]
})
export class CountryModule {}
