import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cidade } from '../entity/cidade.entity';
import { CidadeServiceFindOne } from './cidade.service.findone';

@Injectable()
export class CidadeServiceRemove {
  constructor(
    @InjectRepository(Cidade)
    private cidadeRepository: Repository<Cidade>,
    private readonly service: CidadeServiceFindOne,
  ) {}

  async remove(idCidade: number): Promise<void> {
    const cidadeCadastrada = await this.service.findById(idCidade);

    if (!cidadeCadastrada?.idCidade) {
      throw new Error('Cidade não localizada');
    }

    await this.cidadeRepository
    .createQueryBuilder('cidade')
    .delete()
    .from(Cidade)
    .where('cidade.ID_CIDADE = :idCidade',
       { idCidade: cidadeCadastrada.idCidade })
  }
}
