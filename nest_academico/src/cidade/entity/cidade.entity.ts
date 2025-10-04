import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../commons/entity/base.entity';

@Entity('CIDADE')
export class Cidade extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'ID_CIDADE',
    type: 'number',
  })
  idCidade?: number;

  @Column({
    name: 'COD_CIDADE',
    type: 'nvarchar2',
    length: 10,
  })
  codCidade: string = '';

  @Column({
    name: 'NOME_CIDADE',
    type: 'nvarchar2',
    length: 50,
  })
  nomeCidade: string = '';

  constructor(data: Partial<Cidade> = {}) {
    super();
    Object.assign(this, data);
  }
}
