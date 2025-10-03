import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConverterCidade } from '../dto/converter/cidade.converter';
import { CidadeResponse } from '../dto/response/cidade.response';
import { Cidade } from '../entity/cidade.entity';

@Injectable()
export class CidadeServiceFindOne {
  constructor(
    @InjectRepository(Cidade)
    private cidadeRepository: Repository<Cidade>,
  ) {}

  async findOne(idCidade: number): Promise<CidadeResponse | null> {
    const cidade = await this.cidadeRepository
      .createQueryBuilder('cidade')
      .where('cidade.ID_CIDADE = :idCidade', { idCidade: idCidade })
      .getOne();

 
    if (!cidade) {
      throw new HttpException('Cidade não localizada ', HttpStatus.NOT_FOUND
      );
    }

    return ConverterCidade.toCidadeResponse(cidade);
  }

  async findById(idCidade: number): Promise<Cidade | null> {
    const cidade = await this.cidadeRepository
      .createQueryBuilder('cidade')
      .where('cidade.ID_CIDADE = :idCidade', { idCidade: idCidade })
      .getOne();

    return cidade;
  }
}
