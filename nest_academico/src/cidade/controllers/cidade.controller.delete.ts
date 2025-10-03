import {Controller, Delete, HttpCode, HttpStatus, Param, ParseIntPipe} from '@nestjs/common';
import { CidadeServiceRemove } from '../service/cidade.service.delete';

@Controller('/cidade')
export class CidadeControllerRemove {
    constructor(private readonly cidadeServiceRemove: CidadeServiceRemove) {}

    @HttpCode(HttpStatus.OK)
    @Delete('/remover/:id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.cidadeServiceRemove.remove(id);
    }
}