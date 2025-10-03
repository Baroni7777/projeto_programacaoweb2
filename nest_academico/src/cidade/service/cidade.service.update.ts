import { HttpStatus,HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConverterCidade } from '../dto/converter/cidade.converter';
import { CidadeRequest } from '../dto/request/cidade.request';
import { Cidade } from '../entity/cidade.entity';
import { CidadeServiceFindOne } from './cidade.service.findone';

@Injectable()
export class CidadeServiceUpdate {
  constructor(
    @InjectRepository(Cidade)
    private cidadeRepository: Repository<Cidade>,
    private cidadeServiceFindOne: CidadeServiceFindOne
  ) {}

  async update(id: number, cidadeRequest: CidadeRequest) {
    let cidade = ConverterCidade.toCidade(cidadeRequest);
    let cidadeCadastrada = await this.cidadeServiceFindOne.findById(id);

      if (!cidadeCadastrada) {
        throw new HttpException('Cidade não localizada ', HttpStatus.NOT_FOUND
        );
      }

      cidadeCadastrada.nomeCidade = cidade.nomeCidade;
      cidadeCadastrada.codCidade = cidade.codCidade;

      const cidadeAtualizada = Object.assign(cidadeCadastrada, cidade);
      cidade = await this.cidadeRepository.save(cidadeAtualizada);
    return ConverterCidade.toCidadeResponse(cidade);
  }
}
