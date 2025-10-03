import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { ROTA } from '../../commons/constants/url.sistema';
import { CidadeResponse } from '../dto/response/cidade.response';
import { CidadeServiceFindOne } from '../service/cidade.service.findone';
import { MensagemSistema } from 'src/commons/mensagem/mensagem.sistema';
import { result } from 'src/commons/mensagem/mensagem';
import type { Request } from 'express';

@Controller(ROTA.CIDADE.BASE)
export class CidadeControllerFindOne {
  constructor(private readonly cidadeServiceFindOne: CidadeServiceFindOne) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.CIDADE.BY_ID)
  async findOne(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<result<CidadeResponse | null>> {
    const response = await this.cidadeServiceFindOne.findOne(id);
    return MensagemSistema.showMensagem({
      status: HttpStatus.OK,
      mensagem: 'cidade ENCONTRADA com sucesso!',
      dados: response,
      path: req.path,
      erro: null,
    });
  }
}
