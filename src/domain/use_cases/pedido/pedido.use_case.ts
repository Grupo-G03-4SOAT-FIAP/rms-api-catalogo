import { Inject, Injectable } from '@nestjs/common';
import {
  CriaPedidoDTO,
  PedidoDTO,
  AtualizaPedidoDTO,
} from 'src/adapters/inbound/rest/v1/presenters/pedido.dto';
import { PedidoModel } from 'src/adapters/outbound/models/pedido.model';
import { PedidoNaoLocalizadoErro } from 'src/domain/exceptions/pedido.exception';
import { IPedidoFactory } from 'src/domain/ports/pedido/pedido.factory.port';
import { IPedidoRepository } from 'src/domain/ports/pedido/pedido.repository.port';
import { IPedidoUseCase } from 'src/domain/ports/pedido/pedito.use_case.port';
import { HTTPResponse } from 'src/utils/HTTPResponse';

@Injectable()
export class PedidoUseCase implements IPedidoUseCase {
  constructor(
    @Inject(IPedidoRepository)
    private readonly pedidoRepository: IPedidoRepository,
    @Inject(IPedidoFactory)
    private readonly pedidoFactory: IPedidoFactory,
  ) {}

  async criarPedido(pedido: CriaPedidoDTO): Promise<HTTPResponse<PedidoDTO>> {
    // factory para criar a entidade pedido
    const pedidoEntity = await this.pedidoFactory.criarEntidadePedido(pedido);
    const result = await this.pedidoRepository.criarPedido(pedidoEntity);

    const peditoDTO = new PedidoDTO();
    peditoDTO.id = result.id;
    peditoDTO.numeroPedido = result.numeroPedido;
    peditoDTO.itensPedido = result.itensPedido;
    peditoDTO.statusPedido = result.statusPedido;
    peditoDTO.cliente = result.cliente;

    return {
      mensagem: 'Pedido criado com sucesso',
      body: peditoDTO,
    };
  }

  async editarPedido(
    pedidoId: string,
    pedido: AtualizaPedidoDTO,
  ): Promise<HTTPResponse<PedidoDTO>> {
    const { statusPedido } = pedido;

    const buscaPedido = await this.pedidoRepository.buscarPedido(pedidoId);
    if (!buscaPedido) {
      throw new PedidoNaoLocalizadoErro('Pedido informado não existe');
    }

    const result = await this.pedidoRepository.editarStatusPedido(
      pedidoId,
      statusPedido,
    );

    const peditoDTO = new PedidoDTO();
    peditoDTO.id = result.id;
    peditoDTO.numeroPedido = result.numeroPedido;
    peditoDTO.itensPedido = result.itensPedido;
    peditoDTO.statusPedido = result.statusPedido;
    peditoDTO.cliente = result.cliente;

    return {
      mensagem: 'Pedido atualizado com sucesso',
      body: peditoDTO,
    };
  }

  async buscarPedido(pedidoId: string): Promise<PedidoDTO> {
    const result = await this.pedidoRepository.buscarPedido(pedidoId);
    if (!result) {
      throw new PedidoNaoLocalizadoErro('Pedido informado não existe');
    }

    const peditoDTO = new PedidoDTO();
    peditoDTO.id = result.id;
    peditoDTO.numeroPedido = result.numeroPedido;
    peditoDTO.itensPedido = result.itensPedido;
    peditoDTO.statusPedido = result.statusPedido;
    peditoDTO.cliente = result.cliente;

    return peditoDTO;
  }

  async listarPedidos(): Promise<[] | PedidoDTO[]> {
    const result = await this.pedidoRepository.listarPedidos();
    const listaPedidosDTO = result.map((pedido: PedidoModel) => {
      const peditoDTO = new PedidoDTO();
      peditoDTO.id = pedido.id;
      peditoDTO.numeroPedido = pedido.numeroPedido;
      peditoDTO.itensPedido = pedido.itensPedido;
      peditoDTO.statusPedido = pedido.statusPedido;
      peditoDTO.cliente = pedido.cliente;
      return peditoDTO;
    });
    return listaPedidosDTO;
  }

  async listarPedidosRecebido(): Promise<[] | PedidoDTO[]> {
    const result = await this.pedidoRepository.listarPedidosRecebido();
    const listaPedidosDTO = result.map((pedido: PedidoModel) => {
      const peditoDTO = new PedidoDTO();
      peditoDTO.id = pedido.id;
      peditoDTO.numeroPedido = pedido.numeroPedido;
      peditoDTO.itensPedido = pedido.itensPedido;
      peditoDTO.statusPedido = pedido.statusPedido;
      peditoDTO.cliente = pedido.cliente;
      return peditoDTO;
    });
    return listaPedidosDTO;
  }
}