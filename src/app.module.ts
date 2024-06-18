import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './infrastructure/sql/database/postgres.config.service';
import { CategoriaModule } from './modules/categoria.module';
import { ProdutoModule } from './modules/produto.module';
import { HealthModule } from './modules/health.module';

@Module({
  imports: [
    HealthModule,
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
})
export class AppModule { }
