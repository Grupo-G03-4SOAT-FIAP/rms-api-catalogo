import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './infrastructure/sql/database/postgres.config.service';

import { AppController } from './presentation/rest/v1/controllers/app/app.controller';
import { AppUseCase } from './application/use_cases/app/app.use_case';
import { CategoriaModule } from './modules/categoria.module';
import { ProdutoModule } from './modules/produto.module';

@Module({
  imports: [
    CategoriaModule,
    ProdutoModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppUseCase],
})
export class AppModule {}
