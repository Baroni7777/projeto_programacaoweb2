import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { ROTA } from '../../commons/constants/url.sistema';
import { CidadeResponse } from '../dto/response/cidade.response';
import { CidadeServiceFindAll } from '../service/cidade.service.findall';
import { MensagemSistema } from 'src/commons/mensagem/mensagem.sistema';
import { result } from 'src/commons/mensagem/mensagem';
import type { Request } from 'express';

@Controller(ROTA.CIDADE.BASE)
export class CidadeControllerFindAll {
  constructor(private readonly cidadeServiceFindAll: CidadeServiceFindAll) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.CIDADE.LIST)
  async findAll(@Req() req: Request): Promise<result<CidadeResponse[]>> {
    const response = await this.cidadeServiceFindAll.findAll();
    return MensagemSistema.showMensagem({
      status: HttpStatus.OK,
      mensagem: 'lista de cidade gerada com sucesso!',
      dados: response,
      path: req.path,
      erro: null,
    });
  }
}
