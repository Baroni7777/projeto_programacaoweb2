const ROTA_SISTEMA = 'sistema';
export const DASHBOARD = `/${ROTA_SISTEMA}/dashboard`;

const LISTAR = 'listar';
const CRIAR = 'criar';
const POR_ID = 'buscar';
const ATUALIZAR = 'alterar';
const EXCLUIR = 'excluir';

function gerarRotaSistema(entity: string){
    const base = `${ROTA_SISTEMA}/${entity}`;
    return {
        LISTAR: `/${base}/${LISTAR}`,
        CRIAR: `/${base}/${CRIAR}`,
        POR_ID: `/${base}/${POR_ID}`,
        ATUALIZAR: `/${base}/${ATUALIZAR}`,
        EXCLUIR: `/${base}/${EXCLUIR}`,
    }

}

export const rotas = {
  CIDADE: {
    LISTAR: `/${ROTA_SISTEMA}/cidade/${LISTAR}`,
    CRIAR: "/sistema/cidade/criar",
    ATUALIZAR: "/sistema/cidade/atualizar",
    EXCLUIR: "/sistema/cidade/excluir",
    SHOW: "/sistema/cidade/show",
  },
};