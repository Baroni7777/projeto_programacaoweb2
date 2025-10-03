import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { CidadeRequest } from '../dto/request/cidade.request';
import { CidadeServiceUpdate } from '../service/cidade.service.update';
import { CidadeResponse } from '../dto/response/cidade.response';
import { result } from 'src/commons/mensagem/mensagem';
import { MensagemSistema } from 'src/commons/mensagem/mensagem.sistema';

@Controller(ROTA.CIDADE.BASE)
export class CidadeControllerUpdate {
  constructor(private readonly cidadeServiceUpdate: CidadeServiceUpdate) {}

  @HttpCode(HttpStatus.OK)
  @Put(ROTA.CIDADE.UPDATE)
 async update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() cidadeRequest: CidadeRequest,
  ): Promise<result<CidadeResponse>> {
    const response = await this.cidadeServiceUpdate.update(id, cidadeRequest);
    return MensagemSistema.showMensagem({
      status: HttpStatus.OK,
      mensagem: 'cidade ATUALIZADA com sucesso!',
      dados: response,
      path: req.path,
      erro: null,
    }); 
  }
}
