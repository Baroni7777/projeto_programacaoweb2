# Padrões de Desenvolvimento Backend e Frontend

## Backend (NestJS)

### Arquitetura e Estrutura
- **Clean Architecture + DDD**: Separação clara de responsabilidades.
- **Cada domínio é um módulo independente** (ex: Cidade, Aluno, Professor).
- **1 arquivo = 1 responsabilidade**:
  - Controllers: 1 arquivo por operação HTTP (create, findAll, findOne, update, remove).
  - Services: 1 arquivo por operação de negócio.
  - Entities: 1 arquivo por tabela.
  - DTOs: Separados por request, response, entity.
- **Commons**: Código compartilhado (constants, exceptions, mensagens, base.entity).
- **Rotas dinâmicas**: URLs centralizadas e geradas por função.

### Padrões de Código
- **Injeção de dependência via construtor**.
- **Validação automática** com class-validator nos DTOs.
- **HttpException** para erros de negócio.
- **Respostas padronizadas** via sendHttpResponse.
- **QueryBuilder** preferido para queries complexas.
- **Nomenclatura Oracle**: tabelas/colunas UPPERCASE.
- **Herança de BaseEntity** para auditoria.
- **Zero uso de `any`** (exceto casos documentados).
- **Testabilidade**: serviços isolados e mockáveis.

### Organização de Pastas (Exemplo)
```
nest_academico/
  src/
    main.ts
    app/
      app.module.ts
    commons/
      constants/
      entity/
      exceptions/
      mensagem/
    cidade/
      cidade.module.ts
      controllers/
        cidade.controller.create.ts
        cidade.controller.findall.ts
        ...
      service/
        cidade.service.create.ts
        ...
      entity/
        cidade.entity.ts
      dto/
        converter/
        entity/
        request/
        response/
```

## Frontend (React + TypeScript)

### Arquitetura e Estrutura
- **Componentização extrema**: Components reutilizáveis, views para cada operação CRUD.
- **Hooks customizados** para lógica de negócio (useCriar, useListar, etc).
- **Constants centralizadas** para labels, campos e URLs.
- **Rotas aninhadas**: Layout como pai, views como filhas.
- **Type-safety total**: Tipos e interfaces para todos os dados.
- **CSS Modules customizado** (sem framework CSS).

### Padrões de Código
- **Views "burras"**: Apenas renderizam UI, lógica fica nos hooks.
- **Validação controlada**: onBlur para campos individuais.
- **Icons como componentes** (React Icons).
- **Error handling**: Mensagens de erro centralizadas.
- **Loading states** e **error boundaries** recomendados.

### Organização de Pastas (Exemplo)
```
react_academico/
  src/
    main.tsx
    App.tsx
    assets/
      css/
    components/
      input/
        Input.tsx
      layout/
        Layout.tsx
        layout.css
      mensagem/
        MensagemErro.tsx
    services/
      axios/
        config.axios.ts
      cidade/
        api/
        constants/
        hook/
        type/
      constant/
      router/
        Router.tsx
        url.ts
    type/
      cidade.ts
    views/
      Dashboard.tsx
      cidade/
        Listar.tsx
        Criar.tsx
        Alterar.tsx
        Excluir.tsx
        Consultar.tsx
```

## Convenções Gerais
- **Nomenclatura**:
  - Backend: [domain].controller.[operação].ts, [domain].service.[operação].ts, [domain].entity.ts
  - Frontend: PascalCase para components/views, use[Acao].ts para hooks, [domain].constants.ts
- **Adicionar novo módulo**: Replicar padrão de Cidade (estrutura, arquivos, rotas, constants).
- **Cada adição deve seguir o padrão existente**.

---

**Para detalhes completos, consulte o arquivo GUIA_METODOLOGIA_DESENVOLVIMENTO.md.**
