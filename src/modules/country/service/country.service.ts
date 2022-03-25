/* eslint-disable no-console */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { readFileSync } from 'fs';
import { Repository } from 'typeorm';
import { CountryEntity } from '../model/country.entity';

@Injectable()
export class CountryService {
    public constructor(
        @InjectRepository(CountryEntity)
        private readonly countryRepository: Repository<CountryEntity>
    ) {}

    public async findOrSave(name: string): Promise<CountryEntity> {
        const country = await this.countryRepository.findOne({ name: name });
        if (country) {
            return country;
        } else {
            const newCountry = new CountryEntity();
            newCountry.name = name;
            return this.countryRepository.save(newCountry);
        }
    }

    public async findOne(id: number): Promise<CountryEntity | undefined> {
        return this.countryRepository.findOne(id);
    }

    public async findAll(): Promise<CountryEntity[]> {
        return this.countryRepository.find();
    }
}
