import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionsFilter } from './common/security';
import { configProvider } from './common/provider';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            type: 'sqlite' as any,
            database: configProvider.useFactory().DATABASE_NAME,
            synchronize: configProvider.useFactory().DATABASE_SYNCHRONIZE,
            entities: [configProvider.useFactory().DATABASE_ENTITIES]
        }),
        CommonModule
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionsFilter
        },
        CommonModule
    ]
})
export class ApplicationModule {}
