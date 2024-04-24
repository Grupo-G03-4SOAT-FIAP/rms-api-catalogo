import { Injectable } from '@nestjs/common';
import { CategoriaModel } from '../models/categoria.model';
import { CategoriaEntity } from 'src/domain/categoria/entities/categoria.entity';
import { ProdutoModel } from '../models/produto.model';
import { ProdutoEntity } from 'src/domain/produto/entities/produto.entity';

@Injectable()
export class SQLDTOFactory {
  criarCategoriaDTO(categoria: CategoriaModel): CategoriaEntity {
    return new CategoriaEntity(
      categoria.nome,
      categoria.descricao,
      categoria.id,
    );
  }

  criarProdutoDTO(produto: ProdutoModel): ProdutoEntity {
    const categoriaEntity = this.criarCategoriaDTO(produto.categoria);
    return new ProdutoEntity(
      produto.nome,
      categoriaEntity,
      produto.valorUnitario,
      produto.imagemUrl,
      produto.descricao,
      produto.id,
    );
  }
}
