import { Injectable } from '@nestjs/common';
import {
  AtualizaCategoriaDTO,
  CategoriaDTO,
  CriaCategoriaDTO,
} from 'src/adapters/inbound/rest/v1/presenters/categoria.dto';
import { CategoriaEntity } from 'src/domain/entities/categoria/categoria.entity';
import { ICategoriaFactory } from 'src/domain/ports/categoria/categoria.factory.port';

@Injectable()
export class CategoriaFactory implements ICategoriaFactory {
  criarCategoriaDTO(nome: string, descricao: string, id: string): CategoriaDTO {
    const categoriaDTO = new CategoriaDTO();
    categoriaDTO.nome = nome;
    categoriaDTO.descricao = descricao;
    categoriaDTO.id = id;
    return categoriaDTO;
  }

  criarEntidadeCategoriaFromCriaCategoriaDTO(
    categoriaDTO: CriaCategoriaDTO,
  ): CategoriaEntity {
    const categoriaEntity = new CategoriaEntity(
      categoriaDTO.nome,
      categoriaDTO.descricao,
    );
    return categoriaEntity;
  }

  criarEntidadeCategoriaFromAtualizaCategoriaDTO(
    categoriaDTO: AtualizaCategoriaDTO,
  ): CategoriaEntity {
    const categoriaEntity = new CategoriaEntity(
      categoriaDTO.nome,
      categoriaDTO.descricao,
    );
    return categoriaEntity;
  }
}