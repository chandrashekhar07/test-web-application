import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import { INestApplication } from '@nestjs/common';
import { ApplicationModule } from './modules/app.module';
import { CommonModule, LogInterceptor } from './modules/common';
import { configProvider } from './modules/common/provider';

const API_DEFAULT_PORT = 4000;
const API_DEFAULT_PREFIX = '/api/';

const SWAGGER_TITLE = 'Test API';
const SWAGGER_DESCRIPTION = 'API for test';
const SWAGGER_PREFIX = '/docs';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(ApplicationModule);

    app.setGlobalPrefix(configProvider.useFactory().API_PREFIX || API_DEFAULT_PREFIX);

    if (configProvider.useFactory().SWAGGER_ENABLE === 1) {
        createSwagger(app);
    }

    app.use(bodyParser.json());
    app.use(helmet());

    const logInterceptor = app.select(CommonModule).get(LogInterceptor);
    app.useGlobalInterceptors(logInterceptor);

    await app
        .listen(configProvider.useFactory().API_PORT || API_DEFAULT_PORT)
        .then(() => {
            // eslint-disable-next-line no-console
            console.log(`Server is running on: ${app.getUrl()}`);
        });
}

function createSwagger(app: INestApplication) {
    const version = process.env.npm_package_version || ' ';
    const options = new DocumentBuilder()
        .setTitle(SWAGGER_TITLE)
        .setDescription(SWAGGER_DESCRIPTION)
        .setVersion(version)
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(SWAGGER_PREFIX, app, document);
}

// eslint-disable-next-line no-console
bootstrap().catch((err) => console.error(err));
