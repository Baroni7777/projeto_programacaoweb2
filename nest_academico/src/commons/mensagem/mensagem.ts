import { json } from "stream/consumers";


export interface result<T>{
    status:number;
    timestamp?: string;
    mensagem: string | null;
    erro: string | unknown | null;
    dados: T | null;
    path: string | null;
}


export class mensagem<T> {
    status:number;
    timestamp?: string;
    mensagem: string | null = null;
    erro: string | unknown | null = null;
    dados: T | null = null;
    path: string | null = null;

    constructor(
        status:number,
        mensagem:string | null = null,
        erro: string | unknown | null = null,
        dados: T | null = null,
        path: string | null = null,
    ){
        this.status = status;
        this.mensagem = mensagem;
        this.erro = erro;
        this.dados = dados;
        this.path = path;
    }


    toJSON(): result<T> {
        const result: result<T> = {
            status: this.status,
            timestamp: new Date().toISOString(),
            mensagem: this.mensagem === null || this.mensagem === undefined ? null : this.mensagem,
            erro: this.erro,
            dados: this.dados,
            path: this.path
        }

        if (this.erro !== null && this.erro !== undefined) {
            result.erro = this.erro instanceof Error ? this.erro.message : this.erro;
        }

        if(this.mensagem !== null && this.mensagem !== undefined) {
            result.mensagem = this.mensagem;
        }
        if(this.dados !== null && this.dados !== undefined) {
            result.dados = this.dados;
        }
       if(this.erro !== null && this.erro !== undefined) {
            result.erro = this.erro;
        }

        return result;
}}