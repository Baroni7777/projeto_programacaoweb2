import { result, mensagem } from './mensagem';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MensagemSistema {
  static showMensagem<T>({
    status,
    mensagem: mensagemParam,
    dados,
    path,
    erro,
  }: {
    status: number;
    mensagem: string | null;
    dados: T | null;
    path: string | null;
    erro: string | null ;
  }): result<T> {
    const resposta = new mensagem<T>(status, mensagemParam, erro, dados, path);
    return resposta.toJSON();
  }
}