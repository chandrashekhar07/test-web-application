export interface Config {
  readonly API_PORT: number;

  readonly API_PREFIX: string;

  readonly SWAGGER_ENABLE: number;

  readonly DATABASE_TYPE: string;

  readonly DATABASE_NAME: string;

  readonly DATABASE_SYNCHRONIZE: boolean;

  readonly DATABASE_ENTITIES: string;
}
