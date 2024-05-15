import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ICategoriaUseCase } from 'src/domain/categoria/interfaces/categoria.use_case.port';
import {
  AtualizaCategoriaDTO,
  CategoriaDTO,
  CriaCategoriaDTO,
} from '../../presenters/categoria/categoria.dto';
import { BadRequestError } from '../../helpers/swagger/status-codes/bad_requests.swagger';
import { ConflictError } from '../../helpers/swagger/status-codes/conflict.swagger';
import {
  CategoriaDuplicadaErro,
  CategoriaNaoLocalizadaErro,
} from 'src/domain/categoria/exceptions/categoria.exception';
import { NotFoundError } from '../../helpers/swagger/status-codes/not_found.swagger';

@Controller('categoria')
@ApiTags('Categoria')
export class CategoriaController {
  constructor(
    @Inject(ICategoriaUseCase)
    private readonly categoriaUseCase: ICategoriaUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Adicionar uma nova categoria' })
  @ApiResponse({
    status: 201,
    description: 'Categoria criada com sucesso',
    type: CategoriaDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
    type: BadRequestError,
  })
  @ApiResponse({
    status: 409,
    description: 'Existe uma categoria com esse nome',
    type: ConflictError,
  })
  async criar(@Body() categoria: CriaCategoriaDTO) {
    try {
      return await this.categoriaUseCase.criarCategoria(categoria);
    } catch (error) {
      if (error instanceof CategoriaDuplicadaErro) {
        throw new CategoriaDuplicadaErro(error.message);
      }
      throw error;
    }
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Atualizar uma categoria' })
  @ApiResponse({
    status: 200,
    description: 'Categoria atualizada com sucesso',
    type: CategoriaDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
    type: BadRequestError,
  })
  @ApiResponse({
    status: 404,
    description: 'Categoria informada não existe',
    type: NotFoundError,
  })
  @ApiResponse({
    status: 409,
    description: 'Existe uma categoria com esse nome',
    type: ConflictError,
  })
  async atualizar(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() categoria: AtualizaCategoriaDTO,
  ) {
    try {
      return await this.categoriaUseCase.editarCategoria(id, categoria);
    } catch (error) {
      if (error instanceof CategoriaDuplicadaErro) {
        throw new CategoriaDuplicadaErro(error.message);
      }
      if (error instanceof CategoriaNaoLocalizadaErro) {
        throw new CategoriaNaoLocalizadaErro(error.message);
      }
      throw error;
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Remover uma categoria' })
  @ApiResponse({
    status: 200,
    description: 'Categoria excluída com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoria informada não existe',
    type: NotFoundError,
  })
  async remover(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.categoriaUseCase.excluirCategoria(id);
    } catch (error) {
      if (error instanceof CategoriaNaoLocalizadaErro) {
        throw new CategoriaNaoLocalizadaErro(error.message);
      }
      throw error;
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Buscar uma categoria pelo id' })
  @ApiResponse({
    status: 200,
    description: 'Categoria retornada com sucesso',
    type: CategoriaDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Categoria informada não existe',
    type: NotFoundError,
  })
  async buscar(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.categoriaUseCase.buscarCategoria(id);
    } catch (error) {
      if (error instanceof CategoriaNaoLocalizadaErro) {
        throw new CategoriaNaoLocalizadaErro(error.message);
      }
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as categorias' })
  @ApiResponse({
    status: 200,
    description: 'Lista de categorias retornada com sucesso',
    type: CategoriaDTO,
    isArray: true,
  })
  async listar() {
    return await this.categoriaUseCase.listarCategorias();
  }

  async olaMundo() {
    let a;
    let b;
    let c;
    let d;

    a = 1;
    b = "1";

    c = a + b;

    const e = 0;

    let f = a + "";

    let g;
    let h;

    if (a + b == "11") {
      console.log("What!?😱");
    }
  } 

}
