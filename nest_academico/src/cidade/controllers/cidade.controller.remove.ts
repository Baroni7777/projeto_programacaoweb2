import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { ROTA } from '../../commons/constants/url.sistema';
import { CidadeServiceRemove } from '../service/cidade.service.remove';
import { result } from 'src/commons/mensagem/mensagem';
import { MensagemSistema } from 'src/commons/mensagem/mensagem.sistema';
import type { Request } from 'express';

@Controller(ROTA.CIDADE.BASE)
export class CidadeControllerRemove {
  constructor(private readonly cidadeServiceRemove: CidadeServiceRemove) {}

  @HttpCode(HttpStatus.OK)
  @Delete(ROTA.CIDADE.DELETE)
  async remove(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<result<null>> {
    await this.cidadeServiceRemove.remove(id);
    return MensagemSistema.showMensagem({
      status: HttpStatus.OK,
      mensagem: 'cidade REMOVIDA com sucesso!',
      dados: null,
      path: req.path,
      erro: null,
    });
  }
}
