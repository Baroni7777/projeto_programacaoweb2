# Guia de Estudo para o Projeto NestJS - `nest_academico`

Este documento serve como um guia de estudo rápido para os conceitos e a estrutura do projeto `nest_academico`, ideal para memorização e revisão.

## 1. Estrutura Geral do Projeto NestJS

O projeto segue a arquitetura modular do NestJS, baseada em módulos, controllers e services, promovendo a separação de responsabilidades (SRP - Single Responsibility Principle).

- **`src/`**: Contém todo o código-fonte da aplicação.
  - **`app/`**: Módulo raiz da aplicação (`app.module.ts`).
  - **`cidade/`**: Módulo específico para a entidade `Cidade`.
    - `cidade.module.ts`: Declara controllers, providers e imports específicos da `Cidade`.
    - `controllers/`: Lida com as requisições HTTP e delega para os services.
    - `service/`: Contém a lógica de negócio para a entidade `Cidade`.
    - `dto/`: Data Transfer Objects (DTOs) para requisições, respostas e conversão.
    - `entity/`: Definição da entidade `Cidade` para o banco de dados.
  - **`commons/`**: Módulo para utilitários e constantes globais.
    - `constants/`: Constantes como URLs e nomes de entidades.
    - `entity/`: Entidades base (`base.entity.ts`).
    - `exceptions/`: Tratamento de exceções.
    - `mensagem/`: Padronização de mensagens de resposta.
  - **`main.ts`**: Ponto de entrada da aplicação, inicializa o NestJS.

## 2. Módulos (`@Module`)

- **Propósito**: Organizar a aplicação em unidades funcionais coesas.
- **`AppModule` (`app.module.ts`)**:
  - **`imports`**: Importa outros módulos (ex: `ConfigModule`, `TypeOrmModule`, `CidadeModule`).
  - **`ConfigModule.forRoot()`**: Carrega variáveis de ambiente e as valida usando `Joi`.
  - **`TypeOrmModule.forRootAsync()`**: Configura a conexão com o banco de dados (Oracle neste caso) de forma assíncrona, usando `ConfigService` para obter as credenciais.
  - **`CidadeModule`**: Importa o módulo da cidade, tornando seus controllers e services disponíveis globalmente.
- **`CidadeModule` (`cidade.module.ts`)**:
  - **`imports`**: `TypeOrmModule.forFeature([Cidade])` - Registra a entidade `Cidade` com o TypeORM para este módulo.
  - **`controllers`**: Lista todos os controllers relacionados à `Cidade` (ex: `CidadeControllerCreate`, `CidadeControllerFindAll`).
  - **`providers`**: Lista todos os services relacionados à `Cidade` (ex: `CidadeServiceCreate`, `CidadeServiceFindAll`).
  - **`exports`**: Exporta `TypeOrmModule` e os services para que possam ser usados por outros módulos que importarem `CidadeModule`.

## 3. Entidades e TypeORM

- **`Cidade` (`cidade.entity.ts`)**:
  - **`@Entity('CIDADE')`**: Mapeia a classe `Cidade` para a tabela `CIDADE` no banco de dados.
  - **`@PrimaryGeneratedColumn()`**: Define a chave primária auto-gerada (`idCidade`).
  - **`@Column()`**: Mapeia propriedades da classe para colunas da tabela (`codCidade`, `nomeCidade`).
  - **`BaseEntity`**: Herda de uma classe base comum para campos como `dataCriacao`, `dataAlteracao`, etc.

## 4. DTOs (Data Transfer Objects)

- **Propósito**: Definir a estrutura dos dados que transitam entre as camadas da aplicação (requisições e respostas).
- **`CidadeRequest` (`cidade.request.ts`)**:
  - Usado para dados de entrada (ex: criação/atualização de cidade).
  - **`class-validator`**: Utiliza decoradores como `@IsNotEmpty`, `@IsString`, `@MaxLength` para validação dos dados recebidos na requisição.
  - **`class-transformer`**: `@Type(() => Number)` para transformação de tipos.
- **`CidadeResponse` (`cidade.response.ts`)**:
  - Usado para dados de saída (resposta da API).
  - **`@Expose()`**: Garante que as propriedades sejam incluídas na serialização da resposta.

## 5. Controllers

- **Propósito**: Receber requisições HTTP, validar dados (implicitamente via DTOs e pipes), e delegar a lógica de negócio para os services.
- **Exemplo: `CidadeControllerCreate` (`cidade.controller.create.ts`)**:
  - **`@Controller(ROTA.CIDADE.BASE)`**: Define o prefixo da rota para todos os endpoints neste controller (ex: `/rest/sistema/cidade`).
  - **`constructor(private readonly cidadeServiceCreate: CidadeServiceCreate)`**: Injeção de dependência do service correspondente.
  - **`@Post(ROTA.CIDADE.CREATE)`**: Mapeia o método `create` para uma requisição POST na rota `/rest/sistema/cidade/criar`.
  - **`@HttpCode(HttpStatus.CREATED)`**: Define o código de status HTTP da resposta (201 Created).
  - **`@Body() cidadeRequest: CidadeRequest`**: Extrai o corpo da requisição e o valida contra o `CidadeRequest` DTO.

## 6. Services

- **Propósito**: Conter a lógica de negócio da aplicação, manipular dados e interagir com o banco de dados via repositórios.
- **Exemplo: `CidadeServiceCreate` (`cidade.service.create.ts`)**:
  - **`@Injectable()`**: Marca a classe como um provider que pode ser injetado em outros componentes.
  - **`constructor(@InjectRepository(Cidade) private cidadeRepository: Repository<Cidade>)`**: Injeção do repositório TypeORM para a entidade `Cidade`.
  - **`async create(cidadeRequest: CidadeRequest)`**: Método que implementa a lógica de criação.
    - Utiliza `ConverterCidade.toCidade()` para converter o DTO em entidade.
    - Realiza uma consulta (`createQueryBuilder`) para verificar a existência de uma cidade com o mesmo nome.
    - Lança uma `HttpException` em caso de duplicidade.
    - Salva a nova cidade no banco de dados (`this.cidadeRepository.save(cidade)`).

## 7. Common Utilities

- **`url.sistema.ts`**: Define constantes para URLs base e funções para gerar rotas padronizadas para diferentes entidades (ex: `ROTA.CIDADE.BASE`, `ROTA.CIDADE.LIST`).
- **`mensagem.sistema.ts`**: Fornece um método estático `showMensagem` para padronizar as respostas da API, incluindo status, mensagem, dados, path e erros.

## 8. Fluxo de Requisição (Exemplo: Criar Cidade)

1.  **Cliente**: Envia uma requisição POST para `/rest/sistema/cidade/criar` com os dados da cidade no corpo.
2.  **`CidadeControllerCreate`**: Recebe a requisição, valida o `CidadeRequest`.
3.  **`CidadeServiceCreate`**: É chamado pelo controller.
    - Converte `CidadeRequest` para `Cidade` (entidade).
    - Consulta o banco de dados para verificar duplicidade.
    - Se não houver duplicidade, salva a `Cidade` no banco de dados.
    - Retorna a resposta (ou `null` no exemplo atual).
4.  **`CidadeControllerCreate`**: Recebe o resultado do service e o formata usando `MensagemSistema.showMensagem` antes de enviar a resposta HTTP ao cliente.

Este guia deve ajudar a solidificar os principais conceitos e o fluxo de trabalho dentro do seu projeto `nest_academico`!