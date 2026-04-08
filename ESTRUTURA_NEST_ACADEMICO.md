# Estrutura e Padrão de Desenvolvimento - Nest Acadêmico

## 1. Visão Geral do Padrão
O backend `nest_academico` utiliza uma arquitetura altamente modular e desacoplada, orientada a domínios (Domain-Driven Design). A filosofia arquitetural explora a **Responsabilidade Única (SRP - Single Responsibility Principle) levada ao limite:** em vez de utilizarmos um arquivo gigante com múltiplos métodos para Endpoints de API ou regras de Serviço, **cada rota/operação de API possui seu próprio arquivo de Controller e seu respectivo arquivo de Service**. 

Essa fragmentação severa de arquitetura garante componentes menores, limita as injeções de dependências necessárias para cada operação apenas ao seu escopo estreito e facilita manutenções e documentação do sistema.

## 2. Mapa da Estrutura de Arquivos

A estrutura padronizada (usando o módulo `cidade` como uma referência real) está construída obrigatoriamente da seguinte forma:

```text
src/
├── app/                      # Módulo central da aplicação
│   └── app.module.ts         # Agregador de todos os módulos de domínios (imports)
├── commons/                  # Recursos transversais e Globais compartilhados
│   ├── constants/            # Constantes universais (rotas do sistema: url.sistema.ts, etc)
│   ├── decorators/           # Decorators de reuso (ex: configuração Swagger unificada)
│   ├── entity/               # Entidades baseadas (ex: BaseEntity contendo mapeamento central)
│   ├── enum/                 # Enums globais (ex: paginação padronizada)
│   ├── exceptions/           # Tratamento dinâmico de exceções HTTP globais e formatadores
│   └── mensagem/             # Classes de envolvimento para devolver Responses em formato rigoroso DTO
└── cidade/                   # Exemplo de Módulo de Domínio
    ├── constants/            # Constantes exclusivas do domínio
    │   └── cidade.constants.ts # Estrutura da base, mensagens de erro e documentação do swagger limitadas ao módulo
    ├── controllers/          # Controladores (Acesso via REST), um por operação
    │   ├── cidade.controller.create.ts
    │   ├── cidade.controller.findall.ts
    │   ├── cidade.controller.findone.ts
    │   ├── cidade.controller.update.ts
    │   └── cidade.controller.remove.ts
    ├── dto/                  # Data Transfer Objects modelados para camadas específicas
    │   ├── converter/        # Conversor estático Model<->DTO (usa plainToInstance do class-transformer)
    │   │   └── cidade.converter.ts
    │   ├── request/          # Objeto de entrada (Validado pelo class-validator nos endpoints)
    │   │   └── cidade.request.ts
    │   └── response/         # O objeto higienizado para devolução ao front-end
    │       └── cidade.response.ts
    ├── entity/               # Mapeamento estrito do TypeORM (ORM relacional)
    │   └── cidade.entity.ts
    ├── service/              # Regras de Negócio granulares e Casos de Uso
    │   ├── cidade.service.create.ts
    │   ├── cidade.service.findall.ts
    │   ├── cidade.service.findone.ts
    │   ├── cidade.service.update.ts
    │   └── cidade.service.remove.ts
    └── cidade.module.ts      # Unificador do NestJS daquele Domínio
```

## 3. Guia Rápido: Como criar um novo Fluxo de Negócio com a mesma estrutura

Caso você precise implementar, por exemplo, o domínio abstrato **`produto`**, procederia da seguinte maneira reproduzindo integralmente o projeto original:

### Passo 1: Organizar a Estrutura de Diretórios
Crie a pasta central e garanta todas as subpastas em `src/produto/`:
- Pastas: `constants/`, `controllers/`, `dto/` (e por dentro: `converter/`, `request/`, `response/`), `entity/`, `service/`.

### Passo 2: Definir Padrões Globais Constantes (Constants)
Crie um arquivo em `produto/constants/produto.constants.ts`. Adicione as rotas e URIs nas constantes raiz caso necessário (`commons/constants/url.sistema.ts`).
Configure os itens que comporão as mensagens de obrigatoriedade, tamanho, os nomes técnicos da Base de Dados e os literais do Swagger relativos em objetos literais.

### Passo 3: Mapeamento de Banco de Dados (Entity)
Crie `produto/entity/produto.entity.ts` extendendo `BaseEntity` oriunda da camada genérica `commons`.
Declare os tipos e restrições baseados no TypeORM (`@PrimaryGeneratedColumn`, `@Column`). Instancie um construtor `constructor(data: Partial<Produto> = {}) { super(); Object.assign(this, data); }` para alimentar essa entidade facilmente.

### Passo 4: Transição de Dados (DTOs: Request, Response e Converter)
1. **Modelagem Request:** Construa `produto.request.ts` usando pacotes como o `class-validator` (`@IsString()`, `@MaxLength()`, `@IsOptional()`) baseando as mensagens do arquivo `.constants.ts`.
2. **Modelagem Response:** Defina as interfaces visuais em `produto.response.ts`.
3. **Ponte Converter:** Crie métodos estáticos em `produto.converter.ts` (ex: `toProduto`, `toProdutoResponse`) de conversão direta do request ao DB relacional e vice-versa limpando o lixo desnecessário do TypeORM através do pacote `class-transformer`.

### Passo 5: Construir Arquivos Múltiplos de Casos de Uso (Services)
Ao invés de codificar um único Service enorme, crie individualmente os lógicos de cada funcionalidade: a exemplo de `produto/service/produto.service.create.ts`.
No interior da função, a classe `ProdutoServiceCreate` possuirá a injeção ao repositório na sua construção (`@InjectRepository`). Implemente suas conversões DTO->Entity, utilize o `QueryBuilder`, se for necessário salve com `.save()` e emita `HttpException` mediante erros. Faça o mesmo separadamente para edições (`update`), visualização em lote (`findall`), etc.

### Passo 6: Construir Controladores Específicos (Controllers)
Elabore o Endpoint, exemplo: `produto/controllers/produto.controller.create.ts`.
1. Use anotações `@Controller(ROTA.PRODUTO.BASE)` e `@Post(...)`.
2. O construtor é singular: **Recebe Unicamente o seu próprio Service particular:** `constructor(private readonly produtoServiceCreate: ProdutoServiceCreate) {}`.
3. Assine a classe usando Swagger da própria abstração da raiz Commons (`@ApiPostDoc`, `@ApiResponse`).
4. Repasse de volta as lógicas como um empacotamento em `MensagemSistema.showMensagem(...)` ou similar, entregando com segurança o padronizado JSON Response com metadados adicionais de `HttpStatus`, dados, etc.

### Passo 7: Injetor de Dependência Base (O Module)
Finalmente, junte as peças.
Em `produto/produto.module.ts`:
Importe manualmente as ramificações de Controllers e de Services colocando todas as referências dentro de arrays isolados (ex: `const produtoControllers = [...]`). E registre o Decorator propriamente:

```typescript
@Module({
  imports: [TypeOrmModule.forFeature([Produto])],
  controllers: [...produtoControllers],
  providers: [...produtoServices],
  exports: [TypeOrmModule, ...produtoServices],
})
export class ProdutoModule {}
```

Após todos os passos, basta injetar no topo da cadeia do servidor, adicionando este `ProdutoModule` nos arrays de imports de `app.module.ts`. Prontinho! Assim seu ecossistema terá um crescimento horizontal uniforme com o restante da aplicação.
