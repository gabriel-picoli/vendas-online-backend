// ? este arquivo indica quais serao os outros modulos a serem acessados

// * "Modulo" eh uma maneira de organizar os componentes, ele que tem a
// * responsabilidade de exportar os componentes que serao usados em outros
// * arquivos, como os controllers e os services

import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
