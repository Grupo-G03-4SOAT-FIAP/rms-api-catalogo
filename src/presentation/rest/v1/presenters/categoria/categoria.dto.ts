import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsDefined,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CriaCategoriaDTO {
  @IsString()
  @IsNotEmpty({ message: 'Nome da categoria não pode ser vazio' })
  @IsDefined({ message: 'Nome não pode ser nulo' })
  @MaxLength(100, {
    message: 'Nome não pode ter mais que 100 caracteres',
  })
  @ApiProperty({ description: 'Nome da categoria' })
  nome: string;

  @IsString()
  @IsOptional()
  @MaxLength(255, {
    message: 'Descrição não pode ter mais que 255 caracteres',
  })
  @ApiProperty({ description: 'Descrição da categoria' })
  descricao?: string;
}

export class AtualizaCategoriaDTO {
  @IsString()
  @IsOptional()
  @MaxLength(100, {
    message: 'Nome não pode ter mais que 100 caracteres',
  })
  @ApiProperty({ description: 'Nome da categoria', required: false })
  nome?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255, {
    message: 'Descrição não pode ter mais que 255 caracteres',
  })
  @ApiProperty({ description: 'Descrição da categoria', required: false })
  descricao?: string;
}

export class CategoriaDTO {
  @ApiProperty({ description: 'ID da categoria' })
  id: string;

  @ApiProperty({ description: 'Nome da categoria' })
  nome: string;

  @ApiProperty({ description: 'Descrição da categoria' })
  descricao: string;
}
