export interface Cidade {
  idCidade?:string;
  codCidade?: string;
  nomeCidade?: string;
}



export interface ErrosCidade{
  idCidade?: boolean;
  codCidade?: boolean;
  nomeCidade?: boolean;


  idCidadeMensagem?: string | string[];
  codCidadeMensagem?: string | string[];
  nomeCidadeMensagem?: string | string[];
}