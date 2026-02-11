export function criarMensagemOperacao(ENTITY_NAME: string) {
    return {
        CRIAR:{
        ACAO: `CRIAR NOVO CADASTRO DE${ENTITY_NAME} NO SISTEMA`,
        SUCESSO: `O CADASTRO DE ${ENTITY_NAME} FOI CRIADO COM SUCESSO`,
        ERRO: `Erro ao CADASTRAR ${ENTITY_NAME} NO SISTEMA`,
        EXISTE: `${ENTITY_NAME} já existe no sistema`,
        CANCELAR: `Cancelar ${ENTITY_NAME}`,
        FIELDS: `Erro de validação no campo ${ENTITY_NAME}`,
        },

        ATUALIZAR:{
        ACAO: `ATUALIZAR CADASTRO DE ${ENTITY_NAME} NO SISTEMA`,
        SUCESSO: `O CADASTRO DE ${ENTITY_NAME} FOI ATUALIZADO COM SUCESSO`,
        ERRO: `Erro ao ATUALIZAR ${ENTITY_NAME} NO SISTEMA`,
        EXISTE: `${ENTITY_NAME} já existe no sistema`,
        CANCELAR: `Cancelar ${ENTITY_NAME} no processo de atualização`,
        FIELDS: `Erro de validação no campo ${ENTITY_NAME} ao atualizar`,
        },


        POR_ID:{
        ACAO: `BUSCAR ${ENTITY_NAME} POR ID NO SISTEMA`,
        SUCESSO: `O ${ENTITY_NAME} FOI ENCONTRADO COM SUCESSO`,
        ERRO: `Erro ao BUSCAR ${ENTITY_NAME} POR ID NO SISTEMA`,
        EXISTE: `${ENTITY_NAME} não existe no sistema`,
        CANCELAR: `Cancelar ${ENTITY_NAME} no processo de busca`,
        FIELDS: `Erro de validação no campo ${ENTITY_NAME} ao buscar por ID`,
        },


        EXCLUIR:{
        ACAO: `EXCLUIR ${ENTITY_NAME}`,
        SUCESSO: `O ${ENTITY_NAME} FOI EXCLUÍDO COM SUCESSO`,
        ERRO: `Erro ao EXCLUIR ${ENTITY_NAME} NO SISTEMA`,
        EXISTE: `${ENTITY_NAME} não existe no sistema`,
        CANCELAR: `Cancelar ${ENTITY_NAME} no processo de exclusão`,
        FIELDS: `Erro de validação no campo ${ENTITY_NAME} ao excluir`,
        },

        LISTAR:{
        ACAO: `LISTAR TODOS OS ${ENTITY_NAME}`,
        SUCESSO: `A LISTA DE ${ENTITY_NAME} FOI RETORNADA COM SUCESSO`,
        ERRO: `Erro ao LISTAR ${ENTITY_NAME}`,
        },
        
    }

    

}