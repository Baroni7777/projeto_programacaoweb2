# Regras e Padrões de Desenvolvimento - Nest Acadêmico

Você é um agente de Inteligência Artificial especializado no ecossistema NestJS atuando no projeto **Nest Acadêmico**.
Seu objetivo primário é gerar, refatorar ou analisar código estritamente dentro da arquitetura e dos padrões ultradesacoplados definidos por este projeto.

**NUNCA desvie das regras abaixo ao criar novos módulos, rotas, serviços ou entidades.**

## 1. Princípio Arquitetural Restrito (Extreme SRP)
O projeto segue o Princípio da Responsabilidade Única (Single Responsibility Principle) levado ao seu extremo.
- **NUNCA** crie um controlador (`Controller`) com múltiplos métodos (endpoints).
- **NUNCA** crie um serviço (`Service`) com múltiplos métodos (ex: CRUD completo na mesma classe).
- Cada rota da API **DEVE** ter seu próprio arquivo de Controller (ex: `controller.create`, `controller.findall`).
- Cada operação de negócio **DEVE** ter seu próprio arquivo de Service (ex: `service.create`, `service.findall`).

## 2. Estrutura Obrigatória de Pastas por Domínio
Sempre que criar um novo domínio (ex: `aluno`, `cidade`, `curso`), você **DEVE** criar a seguinte árvore exata de diretórios:

```text
nome-do-dominio/
├── constants/
│   └── nome-do-dominio.constants.ts
├── controllers/
│   ├── nome-do-dominio.controller.create.ts
│   ├── nome-do-dominio.controller.findall.ts
│   ├── nome-do-dominio.controller.findone.ts
│   ├── nome-do-dominio.controller.update.ts
│   └── nome-do-dominio.controller.remove.ts
├── dto/
│   ├── converter/
│   │   └── nome-do-dominio.converter.ts
│   ├── request/
│   │   └── nome-do-dominio.request.ts
│   └── response/
│       └── nome-do-dominio.response.ts
├── entity/
│   └── nome-do-dominio.entity.ts
├── service/
│   ├── nome-do-dominio.service.create.ts
│   ├── nome-do-dominio.service.findall.ts
│   ├── nome-do-dominio.service.findone.ts
│   ├── nome-do-dominio.service.update.ts
│   └── nome-do-dominio.service.remove.ts
└── nome-do-dominio.module.ts
```

## 3. Padrões de Implementação por Camada

### A. Constants (`constants.ts`)
- Não utilize "Magic Strings" perdidas no código. Mensagens de erro, limites de tamanho de campos de banco de dados, nomes de colunas e textos para Swagger **DEVEM** residir no arquivo de constantes daquele domínio.
- Utilize objetos literais para mapear os campos, o Swagger e os erros. (Siga o padrão `ENTITY`, `TABLE`, `TABLE_FIELD`, `INPUT_ERROR`).

### B. Entidades (`entity.ts`)
- **DEVE** estender a classe abstrata `BaseEntity` oriunda de `commons/entity/base.entity.ts`.
- Declare colunas do TypeORM de forma explícita com seus nomes no DB (em maiúsculo), tipos e tamanhos.
- **DEVE** incluir um construtor padronizado: `constructor(data: Partial<SuaEntidade> = {}) { super(); Object.assign(this, data); }`.

### C. DTOs (Request, Response e Converter)
- **Request (`domain.request.ts`)**: Valide estritamente a entrada utilizando os decorators do `class-validator` (`@IsNotEmpty`, `@IsString`, `@MaxLength`, etc). Recupere as mensagens de erro do arquivo `constants.ts` correspondente.
- **Response (`domain.response.ts`)**: Modele as propriedades exatas que serão retornadas (exclua lixos de banco). Utilize decorators do `class-transformer` (`@Expose`) se necessário.
- **Converter (`domain.converter.ts`)**: Crie uma classe utilitária com métodos estáticos (`toEntity`, `toResponse`, `toListResponse`). Nenhuma formatação de entrada/saída crua deve ocorrer diretamente nos Controllers ou Services. Utilize `plainToInstance` do `class-transformer` para conversões fluídas.

### D. Services (Regra de Negócio)
- **Um arquivo por método**. (ex: `cidade.service.create.ts`).
- Receba sempre o repositório (`@InjectRepository`) via construtor.
- Acesse o banco de dados e faça verificações de consistência (lançando `HttpException` se o registro já existir, ou não for encontrado).

### E. Controllers (Acesso Endpoints REST)
- O construtor do Controller recebe **APENAS** o seu respectivo arquivo Service. Se a classe é `NomeControllerCreate` ela injeta **apenas** `NomeServiceCreate`. Nenhuma dependência externa deve poluir o construtor.
- Todos os endpoints **DEVEM** retornar a resposta devidamente envelopada em sucesso usando o padronizador global (ex: `MensagemSistema.showMensagem(...)` ou equivalente listado no projeto).
- Todo Controller deve ter documentação Swagger via decorators da biblioteca `@nestjs/swagger` ou decorators customizados (`ApiPostDoc` do módulo `commons`).

### F. Modules (`module.ts`)
- Agrupe todos os mini-controllers e mini-services em constantes de Array.
- Passe essas constantes nos arrays de `controllers` e `providers` no decorator `@Module`.
- Exporte os services e módulos (ex: `TypeOrmModule`) na chave `exports` caso sejam necessários externamente.

### G. Pasta Commons (`commons/`)
A pasta `commons` não é um domínio de negócio, mas o **Coração Transversal** do sistema. O agente AI **NUNCA** deve criar regras específicas de tabelas, entidades da área de negócio ou controladores lógicos nela. Seu papel é, obrigatoriamente, abrigar abstrações, configurações, utilitários e wrappers compartilhados por todos os outros domínios. A estrutura interna e suas responsabilidades são:

1. **`commons/constants/`**: Único lugar permitido para guardar informações estáticas globais. 
   - `url.sistema.ts`: Configurações globais de rotas (ex: URI `/v1/`, domínios base).
   - `constants.sistema.ts` / `constants.entity.ts`: Textos magnos, como mensagens genéricas e funções como `criarMensagemOperacao(ENTITY_NAME)`.
2. **`commons/decorators/`**: Destinado exclusivamente a custom decorators reutilizáveis.
   - `swagger.decorators.ts`: Empacota os decorators `@Api` repetitivos, aliviando a carga nos controllers.
3. **`commons/entity/`**: Para extensões de banco de dados.
   - `base.entity.ts`: Classe abstrata principal. Todas as entidades filhas de banco de dados do sistema **DEVEM estendê-la**. Ela provê propriedades embutidas e universais para o ecossistema (se disponíveis, como timestamps de auditoria, ou regras base).
4. **`commons/enum/`**: Utilizado para enumerações transversais (que atendam mais de um módulo).
   - `paginacao.enum.ts`: Contêm constantes de ordenação default (ASC/DESC), tamanho de página, fallback paths, garantindo query params previsíveis no `findAll`.
5. **`commons/exceptions/`**: Central do Tratamento Global de Erros do Nest.
   - Contém subpastas de erros Custom (como `error/`) e Notáveis como o `filter/http.exception.filter.ts`, que captura todas as falhas da aplicação globalmente e formata para o `sendHttpResponse`.
6. **`commons/mensagem/`**: Mecanismo de envelopamento estruturado da interface com o "Front-end" (Retorno ao cliente). As responses não sofrem cast cru.
   - `mensagem.ts`, `mensagem.sistema.ts`, `send.response.ts`: Arquivos que estruturam envelopes para conter status, payloads (dados), roteiros e rastros de erros (`MensagemSistema.showMensagem()`). Todo e qualquer controler delega seu retorno final de sucesso para estes utilitários padronizando em 100% o payload exposto.

### H. Contexto de Inicialização Principal (`main.ts`)
O arquivo `main.ts` é o *Entry Point*. Ele possui propósitos engessados e o agente **NÃO DEVE** criar rotas ou lógicas de negócio aqui. As regras que regem o main são limitadas a:
1. **Atrelamento do Exception Filter:** Utilizando `app.useGlobalFilters(new HttpExceptionFilter())`. Qualquer erro estourado na aplicação passa por aqui de volta para a pasta Commons.
2. **CORS:** Configuração de bloqueio/liberação de portas e origens (ex: `'http://localhost:3000'`).
3. **Instalação do Swagger:** O `main.ts` utiliza o `DocumentBuilder` para gerar a porta `/docs` servindo toda a aplicação.

## 4. Estilo de Código e TypeScript
- Adote forte tipagem para os retornos de tudo (`Promise<TipoDeRetorno>`).
- Todas as injeções e inicializações nos construtores devem utilizar o padrão TypeScript via modificadores de escopo (`private readonly service: TipoDoService`).
- Não utilize export default. Exporte explicitamente as classes e constantes (`export class`, `export const`).

## 5. Exemplo Rápido de Fluxo Mente-Agente
Quando o usuário solicitar: *"Crie o fluxo de Cadastro para o domínio Categoria"*, você deve conceber e gerar no mínimo os seguintes arquivos em paralelo mental:
1. `categoria.constants.ts` (Textos vitais)
2. `categoria.entity.ts` (O mapeamento DB)
3. `categoria.request.ts` (Validadores REST)
4. `categoria.response.ts` (Corpo limpo REST)
5. `categoria.converter.ts` (A ponte entre Entity e Request/Response)
6. `categoria.service.create.ts` (Lógica que salva no repositório)
7. `categoria.controller.create.ts` (Rota HTTP encapsulando as devoluções)
8. `categoria.module.ts` (Registro no ecosistema Nest)

Ao gerar resposta em código para o usuário, verifique incansavelmente todos esses 8 pilares para não perder a arquitetura!
