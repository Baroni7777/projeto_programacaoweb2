# 🎓 Guia Definitivo de Estudos: react_academico

> **Objetivo:** Este guia foi criado para explicar **tudo** sobre o projeto `react_academico`. Ele disseca a estrutura, as tecnologias e o código linha a linha, focando no "porquê" e no "como", ideal para estudar para sua prova.

---

## 1. 🏗️ Visão Geral e Tecnologias

O projeto é um **Frontend Single Page Application (SPA)** construído com ferramentas modernas.

### Stack Tecnológico
*   **React (v19)**: Biblioteca principal para construção da interface.
*   **Vite**: Ferramenta de build e servidor de desenvolvimento (substituto mais rápido do Create React App).
*   **TypeScript**: Adiciona tipagem estática ao Javascript (segurança e intellisense).
*   **React Router Dom (v7)**: Gerencia a navegação entre páginas sem recarregar o navegador.
*   **Axios**: Biblioteca para fazer requisições HTTP (buscar dados do backend).
*   **React Icons**: Biblioteca de ícones (lupinha, lixeira, etc).

---

## 2. 📂 Arquitetura de Pastas (Onde as coisas moram?)

Entender a pasta `src` é metade da prova. A organização segue um padrão de **camadas**.

```text
src/
├── assets/          # Imagens, CSS global (arquivos estáticos)
├── components/      # "Peças de LEGO" reutilizáveis (Botões, Layouts, Inputs)
│   └── layout/      # Estrutura base da página (Menu lateral + Cabeçalho)
├── services/        # O "Cérebro" de dados. Tudo que não é visual fica aqui.
│   ├── axios/       # Configuração do cliente HTTP (IP do servidor, timeout)
│   ├── router/      # Definição das rotas (quem aponta para onde)
│   ├── cidade/      # Módulo da Entidade Cidade (API e Tipos)
│   └── constants/   # Textos fixos e configurações globais
├── views/           # As "Páginas" reais do sistema
│   └── cidade/      # Telas de CRUD de cidade (Listar, Criar, Editar...)
├── App.tsx          # Configura o Roteador
└── main.tsx         # Ponto de entrada (Injeta o React no HTML)
```

---

## 3. 🔄 O Fluxo da Aplicação (Como o código roda?)

Para a prova, você precisa saber a ordem de execução:

1.  **`index.html`**: O navegador carrega este arquivo. Lá tem uma `div` com `id="root"`.
2.  **`main.tsx`**: O React "se conecta" à div `root`.
    *   *O que ele faz?* Renderiza o componente `<App />` dentro do `<StrictMode>`.
3.  **`App.tsx`**: Configura o Roteamento.
    *   *O que ele faz?* Usa o `RouterProvider` para dizer ao sistema: "Use estas rotas aqui".
4.  **`services/router/Router.tsx`**: Define as regras de navegação.
    *   *Exemplo*: Se a URL for `/sistema/cidade/listar`, carregue o componente `ListarCidade`.
5.  **`Layout.tsx`**: É o "moldura" do site.
    *   Renderiza o Menu e o Header fixos.
    *   Usa uma tag especial chamada `<Outlet />` para renderizar o conteúdo da página atual (seja dashboard ou cidade) no miolo da tela.

---

## 4. 🧠 Módulos Principais Explicados

### A. Roteamento (`src/services/router/Router.tsx`)
O projeto usa a nova API de dados do React Router (`createBrowserRouter`).

**Conceito Chave: Rotas Aninhadas (Nested Routes)**
```typescript
{
  path: "/sistema",
  element: <Layout />, // O Pai
  children: [          // Os Filhos
    {
       path: "/sistema/dashboard",
       element: <Dashboard />
    }
  ]
}
```
*   **Por que assim?** Para que o `<Layout>` (Menu/Topo) não precise ser recarregado. Apenas o miolo (`Outlet`) muda quando você navega de Dashboard para Cidade.

### B. Comunicação HTTP (`src/services/axios/config.axios.ts`)
Aqui é criada uma instância do Axios.

```typescript
export const http = axios.create({
  baseURL: REST_CONFIG.BASE_URL, // Vem de uma constante (provavelmente localhost ou API real)
  timeout: 15000, // Se demorar 15s, cancela e dá erro.
  // ...
});
```
*   **Por que usar instância?** Para não repetir a URL base em toda chamada. Em vez de `axios.get('http://localhost:8080/cidades')`, você só faz `http.get('/cidades')`.

---

## 5. 🕵️ Análise Detalhada: CRUD de Cidade

Este é o exemplo perfeito para estudar. Envolve **Tipagem**, **API** e **Componente**.

### Passo 1: A Tipagem (`Cidade.ts`)
Define o contrato de dados.
```typescript
export interface Cidade {
  idCidade?: string;  // A ? significa opcional (pode não existir antes de criar)
  codCidade?: string;
  nomeCidade?: string;
}
```
*   **Para a prova:** Interface serve para o TypeScript avisar se você tentar acessar `cidade.idade` (que não existe) ou tentar passar um número onde deveria ser string.

### Passo 2: O Serviço (`api.cidade.ts`)
Funções puras que chamam o backend. Elas são `async` porque dependem da rede (demoram).
```typescript
export const apiGetCidades = async () => {
  // Chama GET /cidade/listar
  const response = await http.get(ROTA.CIDADE.LISTAR);
  return response;
};
```
*   **Async/Await:** "Espere (`await`)" a resposta chegar antes de continuar a execução.

### Passo 3: A Página (`Listar.tsx`)
Aqui a mágica acontece. Vamos dissecar os Hooks.

#### Hook 1: `useState` (Estado)
```typescript
const [models, setModels] = useState<Cidade[] | null>(null);
```
*   **O que faz?** Cria uma variável `models` que, quando mudada (via `setModels`), avisa o React para redesenhar a tela com os novos dados.
*   **Tipo:** Começa `null` e depois vira uma lista de cidades (`Cidade[]`).

#### Hook 2: `useEffect` (Efeito Colateral)
```typescript
useEffect(() => {
  async function getCidades() {
    const cidades = await buscarTodasCidades(); // Busca no backend
    if (cidades) setModels(cidades);            // Atualiza o estado
  }
  getCidades();
}, []); // <--- Array vazio IMPORTANTE
```
*   **O array vazio `[]`**: Significa "Execute isso **apenas uma vez**", logo que o componente aparecer na tela (mount). Sem ele, o código entraria em loop infinito.

#### O Retorno (Renderização)
O componente retorna JSX (HTML misturado com JS).
```typescript
{models?.map((model) => ( // O ? verifica se models não é nulo antes de tentar mapear
  <tr key={model.idCidade}> ... </tr>
))}
```
*   **Map:** Transforma cada objeto `Cidade` em um pedaço de HTML (`tr`).
*   **Key:** Obrigatório no React para listas. Ajuda o React a saber qual item mudou/bui removido para atualizar a tela rápido.

---

## 6. 📝 Simulado: Perguntas de Prova

Tente responder antes de ler a resposta!

### Q1: Qual a função do arquivo `main.tsx`?
> **Resposta:** É o ponto de entrada da aplicação. Ele busca o elemento DOM com id "root" e renderiza o componente principal `<App />` dentro dele.

### Q2: Para que serve o array de dependências `[]` no final do useEffect em `Listar.tsx`?
> **Resposta:** Ele indica que o efeito (a busca de dados na API) deve ser executado apenas **uma vez**, quando o componente é montado (carregado na tela). Se fosse omitido, o efeito rodaria a cada renderização.

### Q3: Explique o que é o `<Outlet />` usado no `Layout.tsx`.
> **Resposta:** O `Outlet` é um placeholder (espaço reservado) do React Router. É onde os componentes das rotas filhas (como Dashboard ou ListarCidade) serão renderizados dentro do componente pai (Layout).

### Q4: Por que as funções de API em `api.cidade.ts` são assíncronas (`async`)?
> **Resposta:** Porque chamadas de rede (HTTP) levam um tempo indeterminado para responder. O `async/await` permite que o código espere a resposta sem travar o navegador.

### Q5: O que acontece se eu tentar acessar `model.xyz` dentro do `map` em `Listar.tsx`?
> **Resposta:** O TypeScript vai gerar um erro de compilação (sublinhado vermelho), pois a propriedade `xyz` não foi definida na interface `Cidade` em `type/Cidade.ts`.

---

## 7. 💡 Dicas Finais

1.  **Sempre olhe os imports:** Eles dizem de onde as coisas vêm.
2.  **Entenda o fluxo de dados:** API -> Chamada no useEffect -> Atualiza useState -> Renderiza na tela.
3.  **Dica de ouro:** Se cair sobre "Componentes Funcionais", lembre-se que são apenas funções que retornam HTML (JSX) e podem usar Hooks.

Boa sorte na prova! 🚀
