import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { CidadeModule } from 'src/cidade/cidade.module';

const oracledb = require('oracledb');

oracledb.initOracleClient({
  libDir: '../../../../oracle/instantclient',
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_TYPE: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().default(1521),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_DATABASE: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_AUTOLOADENTITIES: Joi.boolean().default(true),
        DATABASE_SYNCHRONIZE: Joi.boolean().default(false),
        DATABASE_LOGGING: Joi.boolean().default(true),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'oracle',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        sid: configService.get('DATABASE_DATABASE'),
        password: configService.get('DATABASE_PASSWORD'),
        autoLoadEntities: configService.get('DATABASE_AUTOLOADENTITIES'),
        synchronize: configService.get('DATABASE_SYNCHRONIZE'),
        logging: ['query', 'error'],
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        extra: {
          connectionTimeout: 30000,
        },
      }),
    }),
    CidadeModule,
  ],
})
export class AppModule {}
