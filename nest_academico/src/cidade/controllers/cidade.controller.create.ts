import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ROTA } from '../../commons/constants/url.sistema';
import { CidadeRequest } from '../dto/request/cidade.request';
import { CidadeServiceCreate } from '../service/cidade.service.create';
import { CidadeResponse } from '../dto/response/cidade.response';

@Controller(ROTA.CIDADE.BASE)
export class CidadeControllerCreate {
  constructor(private readonly cidadeServiceCreate: CidadeServiceCreate) {}

  @HttpCode(HttpStatus.CREATED)
  @Post(ROTA.CIDADE.CREATE)
  async create(@Body() cidadeRequest: CidadeRequest): Promise<CidadeResponse | null> {
    const response = await this.cidadeServiceCreate.create(cidadeRequest);
    return response;
  }
}
