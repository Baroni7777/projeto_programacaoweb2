# 📚 Guia de Estudos - React Acadêmico

**Preparação para Prova - React + TypeScript + Axios**

---

## 📋 Sumário

1. [Visão Geral do Projeto](#visão-geral-do-projeto)
2. [Configuração e Setup](#configuração-e-setup)
3. [Estrutura de Pastas](#estrutura-de-pastas)
4. [Conceitos Fundamentais](#conceitos-fundamentais)
5. [Detalhamento de Componentes](#detalhamento-de-componentes)
6. [Detalhamento de Serviços](#detalhamento-de-serviços)
7. [Detalhamento de Views (Telas)](#detalhamento-de-views-telas)
8. [Custom Hooks](#custom-hooks)
9. [Roteamento](#roteamento)
10. [Fluxo de Dados](#fluxo-de-dados)
11. [Validação de Formulários](#validação-de-formulários)
12. [Perguntas de Prova](#perguntas-de-prova)

---

## 🎯 Visão Geral do Projeto

### O que é?
Um **sistema acadêmico** em React que gerencia cidades (CRUD - Create, Read, Update, Delete). É um exemplo completo de uma aplicação full-stack onde o React se comunica com uma API NestJS.

### Tecnologias Utilizadas
- **React 19.1.1** - Biblioteca de UI
- **TypeScript** - Tipagem estática
- **Vite 7.1.7** - Bundler e dev server
- **React Router DOM 7.9.4** - Roteamento de páginas
- **Axios 1.12.2** - Cliente HTTP para comunicação com API
- **React Icons 5.5.0** - Ícones reutilizáveis

### Objetivo
Demonstrar um padrão profissional de arquitetura React com:
- Separação de responsabilidades
- Custom hooks para lógica reutilizável
- Validação de formulários
- Comunicação com API
- Roteamento dinâmico

---

## ⚙️ Configuração e Setup

### Vite Config
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```
**Por que Vite?** É muito mais rápido que Create React App (CRA). Oferece HMR (Hot Module Replacement) instantâneo.

### Scripts Disponíveis
```json
{
  "dev": "vite --port=3000",      // Inicia servidor dev na porta 3000
  "build": "tsc -b && vite build", // Compila TypeScript e cria build
  "lint": "eslint .",              // Verifica código com ESLint
  "preview": "vite preview"        // Preview da versão de produção
}
```

### Arquivo Principal
```typescript
// main.tsx - PONTO DE ENTRADA
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./assets/css/index.css";
import "./assets/css/main.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

**Explicação:**
- `StrictMode` - Ativa verificações de desenvolvimento (detecta problemas)
- `createRoot` - Renderiza React na div com id "root" do HTML
- Imports de CSS globais

---

## 📁 Estrutura de Pastas

```
react_academico/src/
├── components/          # Componentes reutilizáveis
│   ├── input/          # Componente Input customizado
│   ├── layout/         # Componente Layout principal
│   └── mensagem/       # Componentes de mensagens
├── services/           # Lógica de negócio
│   ├── axios/          # Configuração do cliente HTTP
│   ├── cidade/         # Tudo relacionado a Cidades
│   │   ├── api/        # Chamadas HTTP
│   │   ├── constants/  # Constantes (strings, labels)
│   │   ├── hook/       # Custom hooks
│   │   ├── type/       # Interfaces/Types
│   │   └── ...
│   ├── constant/       # Constantes globais
│   └── router/         # Configuração de rotas
├── views/              # Telas/Páginas
│   ├── Dashboard.tsx
│   └── cidade/         # Telas relacionadas a Cidades
│       ├── Listar.tsx
│       ├── Criar.tsx
│       ├── Alterar.tsx
│       ├── Excluir.tsx
│       └── Consultar.tsx
└── type/               # Tipos globais
```

### Padrão de Organização
**Por Feature (Recomendado)** - Cada feature tem sua pasta contendo:
- `api/` - Requisições HTTP
- `constants/` - Valores constantes
- `hook/` - Custom hooks
- `type/` - Interfaces TypeScript

**Vantagem:** Fácil de manutenir e escalar

---

## 💡 Conceitos Fundamentais

### 1. TypeScript em React
```typescript
// Interface - Contrato do que a função espera
interface Cidade {
  idCidade?: string;
  codCidade?: string;
  nomeCidade?: string;
}

// Tipo genérico
type Props = {
  data: Cidade[];
  onSelect: (cidade: Cidade) => void;
};
```

### 2. React Hooks
São funções que conectam componentes com funcionalidades do React.

#### useState - Gerenciar Estado
```typescript
const [count, setCount] = useState<number>(0);
// count = valor atual
// setCount = função para alterar o valor
```

#### useEffect - Efeitos Colaterais
```typescript
useEffect(() => {
  // Executado quando o componente monta ou dependências mudam
  console.log("Componente montado!");
  
  return () => {
    // Cleanup - executado quando o componente desmonta
  };
}, []); // Array vazio = executa só na montagem
```

#### useCallback - Memoizar Funções
```typescript
const handleClick = useCallback(() => {
  // Função que não é recriada a cada render
  console.log("Clicado!");
}, []); // Só recria se dependências mudarem
```

#### useMemo - Memoizar Valores
```typescript
const isValid = useMemo(() => {
  // Calcula apenas quando dependências mudam
  return error === false && isTouched;
}, [error, isTouched]);
```

#### useId - IDs Únicos
```typescript
const reactId = useId(); // Gera ID único
const inputId = id ?? `input-${reactId}`;
```

### 3. Componentes Memo
```typescript
export const Input = memo(({ label, ...props }: InputProps) => {
  // Só rerender se props mudarem
  return <input {...props} />;
});
```
**Por que?** Evita renders desnecessários, melhora performance.

---

## 🧩 Detalhamento de Componentes

### 1. Componente Input Customizado

**Arquivo:** `components/input/Input.tsx`

```typescript
type InputProps = CustomInputProps & 
                  ValidationProps & 
                  Omit<ComponentPropsWithoutRef<"input">, ...>;
```

**Props Importantes:**
- `label` - Texto do rótulo
- `Icon` - Ícone opcional
- `error` - Boolean indicando erro
- `errorMensagem` - Array de mensagens de erro
- `touched` - Se o campo foi tocado/focado
- `onTouchedChange` - Callback quando perde foco

**Lógica Principal:**
```typescript
// Determina se tem erro
const hasErrors = useMemo(() => {
  if (error === true) return true;
  if (error === false) return false;
  return errorMensagem.length > 0 && isTouched;
}, [error, errorMensagem.length, isTouched]);

// Determina se é válido
const isValid = useMemo(() => {
  return error === false && isTouched;
}, [error, isTouched]);

// Aplica classes CSS
const getInputClass = useMemo(() => {
  return [
    "form-control",
    "app-input",
    hasErrors ? "is-invalid" : "",
    isValid ? "is-valid" : "",
  ].filter(Boolean).join("  ");
}, [hasErrors, isValid]);
```

**Por que tudo isso?**
- Validação em tempo real
- Feedback visual (cores, mensagens)
- Acessibilidade (aria-invalid, aria-describedby)
- Reutilizável em toda a aplicação

---

### 2. Componente Layout

**Arquivo:** `components/layout/Layout.tsx`

```typescript
export default function Layout() {
  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/sistema/dashboard">Dashboard</Link>
        <Link to="/sistema/cidade/listar">Cidade</Link>
      </aside>
      <div className="content">
        <header>
          <div className="system-title">
            <b>Sistema Acadêmico</b>
          </div>
          <div className="user-info">
            <span className="username"><b>Francisco</b></span>
            <a href="#" className="btn btn-logout">Logout</a>
          </div>
        </header>
        <main>
          <Outlet />  {/* Renderiza a página filha */}
        </main>
      </div>
    </div>
  );
}
```

**Explicação:**
- `Layout` é um **componente container** (envolve outras páginas)
- `<Outlet />` - Placeholder onde as páginas filhas são renderizadas
- Sidebar com navegação
- Header com informações do usuário

**Por que?** Evita repetir navegação em cada página.

---

### 3. Componente MensagemErro

**Arquivo:** `components/mensagem/MensagemErro.tsx`

```typescript
interface MensagemProps {
  error?: boolean;
  mensagem?: string | string[];
}

const MensagemErro = ({ error, mensagem }: MensagemProps) => {
  const unique = Array.from(
    new Set(typeof mensagem === "string" ? [mensagem] : mensagem || [])
  );

  return (
    <>
      {error && unique.length > 0 && (
        <div className="invalid-feedback">
          {unique.map((item, index) => (
            <p key={index} style={{ margin: "0", color: "red" }}>
              <span>{item}</span>
            </p>
          ))}
        </div>
      )}
    </>
  );
};
```

**Lógica:**
- `new Set()` - Remove duplicatas de mensagens
- `map()` - Renderiza cada mensagem em uma linha
- Só aparece se `error === true`

---

## 🔌 Detalhamento de Serviços

### 1. Configuração do Axios

**Arquivo:** `services/axios/config.axios.ts`

```typescript
import axios from "axios";
import { REST_CONFIG } from "../constant/sistema.constants";

export const http = axios.create({
  baseURL: "http://localhost:8000/rest", // URL da API
  timeout: 15000,                        // Timeout em ms
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false, // Não envia cookies
});
```

**Por que?** Centraliza a configuração do cliente HTTP. Qualquer mudança na API só afeta um lugar.

---

### 2. API de Cidades

**Arquivo:** `services/cidade/api/api.cidade.ts`

```typescript
import { http } from "../../axios/config.axios";
import { ROTA } from "../../router/url";
import type { Cidade } from "../type/Cidade";

// GET - Busca todas as cidades
export const apiGetCidades = async () => {
  const response = await http.get(ROTA.CIDADE.LISTAR);
  return response;
};

// GET - Busca uma cidade por ID
export const apiGetCidade = async (idCidade: string) => {
  const response = await http.get(`${ROTA.CIDADE.POR_ID}/${idCidade}`);
  return response;
};

// POST - Cria nova cidade
export const apiPostCidade = async (cidade: Cidade) => {
  const response = await http.post(ROTA.CIDADE.CRIAR, cidade);
};

// PUT - Atualiza cidade
export const apiPutCidade = async (idCidade: string, cidade: Cidade) => {
  const response = await http.put(
    `${ROTA.CIDADE.ATUALIZAR}/${idCidade}`,
    cidade,
  );
};

// DELETE - Deleta cidade
export const apiDeleteCidade = async (idCidade: string) => {
  const response = await http.delete(`${ROTA.CIDADE.EXCLUIR}/${idCidade}`);
};
```

**Padrão REST:**
- `GET /listar` - Lê dados
- `POST /criar` - Cria dados
- `PUT /alterar/:id` - Atualiza dados
- `DELETE /excluir/:id` - Deleta dados

---

### 3. Types e Interfaces

**Arquivo:** `services/cidade/type/Cidade.ts`

```typescript
export interface Cidade {
  idCidade?: string;
  codCidade?: string;
  nomeCidade?: string;
}

export interface ErrosCidade {
  // Flags de erro
  idCidade?: boolean;
  codCidade?: boolean;
  nomeCidade?: boolean;

  // Mensagens de erro
  idCidadeMensagem?: string | string[];
  codCidadeMensagem?: string | string[];
  nomeCidadeMensagem?: string | string[];
}
```

**Por que separar?** Mantém tipos bem organizados e reutilizáveis.

---

### 4. Constantes

**Arquivo:** `services/cidade/constants/cidade.constants.ts`

```typescript
export const CIDADE = {
  ENTITY: "Cidade",
  ALIAS: "cidade",

  DADOS_INICIAIS: {
    idCidade: "",
    codCidade: "",
    nomeCidade: "",
  },

  FIELDS: {
    ID: "idCidade",
    CODIGO: "codCidade",
    NOME: "nomeCidade",
  },

  LABEL: {
    CODIGO: "Código",
    NOME: "Nome",
  },

  TITULO: {
    LISTA: "Lista de Cidade",
    CRIAR: "Nova Cidade",
    ATUALIZAR: "Atualizar Cidade",
    EXCLUIR: "Excluir Cidade",
    CONSULTAR: "Consultar Cidade",
  },

  INPUT_ERROR: {
    CODIGO: {
      BLANK: "O código de Cidade deve ser informado",
      VALID: "Informe um código válido para Cidade",
      MAX_LEN: "O código de Cidade deve ter no máximo 20 caracteres",
      MIN_LEN: "O código de Cidade deve ter no mínimo 6 caracteres",
      STRING: "O código de Cidade deve ser um texto",
    },
    NOME: {
      BLANK: "O nome de Cidade deve ser informado",
      VALID: "Informe um nome válido para Cidade",
      MAX_LEN: "O nome de Cidade deve ter no máximo 20 caracteres",
      MIN_LEN: "O nome de Cidade deve ter no mínimo 6 caracteres",
      STRING: "O nome de Cidade deve ser um texto",
    },
  },

  OPERACAO: { /* mensagens de sucesso/erro */ }
};
```

**Por que?**
- **DRY (Don't Repeat Yourself)** - Sem duplicação de strings
- **Manutenção** - Mudar texto em um lugar
- **i18n Pronto** - Fácil traduzir depois

---

## 📄 Detalhamento de Views (Telas)

### 1. Listar Cidades

**Arquivo:** `views/cidade/Listar.tsx`

```typescript
export default function ListarCidade() {
  const [models, setModels] = useState<Cidade[] | null>(null);

  // useEffect executa ao carregar a página
  useEffect(() => {
    async function getCidades() {
      const cidades = await buscarTodasCidades();
      if (cidades) {
        setModels(cidades);
      }
    }
    getCidades(); // Chama a função assíncrona
  }, []); // Vazio = executa só uma vez na montagem

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <h2>{CIDADE.TITULO.LISTA}</h2>
        
        {/* Botão para criar nova cidade */}
        <Link to="/sistema/cidade/criar" className="btn btn-add">
          <FaPlus /> Novo
        </Link>

        {/* Tabela com cidades */}
        <table>
          <thead>
            <tr>
              <th>{CIDADE.LABEL.CODIGO}</th>
              <th>{CIDADE.LABEL.NOME}</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {/* Renderiza cada cidade */}
            {models?.map((model) => (
              <tr key={model.idCidade}>
                <td>{model.codCidade}</td>
                <td>{model.nomeCidade}</td>
                <td>
                  {/* Links para ações */}
                  <Link to={`/sistema/cidade/alterar/${model.idCidade}`}>
                    <BsPencilSquare /> Atualizar
                  </Link>
                  <Link to={`/sistema/cidade/excluir/${model.idCidade}`}>
                    <FaRegTrashAlt /> Excluir
                  </Link>
                  <Link to={`/sistema/cidade/buscar/${model.idCidade}`}>
                    <FaMagnifyingGlass /> Consulta
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

**Fluxo:**
1. Componente monta
2. `useEffect` carrega cidades da API
3. `setState` atualiza `models`
4. React rerendera a tabela
5. `map()` renderiza cada linha

**Por que `?.` (optional chaining)?**
```typescript
{models?.map(...)} 
// Se models for null/undefined, não quebra
// Evita erro: "Cannot read property 'map' of null"
```

---

### 2. Criar Cidade

**Arquivo:** `views/cidade/Criar.tsx`

```typescript
export default function CriarCidade() {
  // Usa o custom hook useCriar
  const { model, errors, handleChangeField, validateField, onSubmitForm } =
    useCriar();

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <h2>Nova Cidade</h2>
        <form onSubmit={(e) => onSubmitForm(e)}>
          
          {/* Campo Código */}
          <Input
            label={CIDADE.LABEL.CODIGO}
            id={CIDADE.FIELDS.CODIGO}
            name={CIDADE.FIELDS.CODIGO}
            value={model?.codCidade}
            onChange={(e) =>
              handleChangeField(CIDADE.FIELDS.CODIGO, e.target.value)
            }
            onBlur={(e) => validateField(CIDADE.FIELDS.CODIGO, e)}
            error={errors.codCidade}
            errorMensagem={errors.codCidadeMensagem}
          />

          {/* Campo Nome */}
          <Input
            label={CIDADE.LABEL.NOME}
            id={CIDADE.FIELDS.NOME}
            name={CIDADE.FIELDS.NOME}
            value={model?.nomeCidade}
            onChange={(e) =>
              handleChangeField(CIDADE.FIELDS.NOME, e.target.value)
            }
            onBlur={(e) => validateField(CIDADE.FIELDS.NOME, e)}
            error={errors.nomeCidade}
            errorMensagem={errors.nomeCidadeMensagem}
          />

          {/* Botões */}
          <button type="submit" className="btn btn-success">
            <FaSave /> Salvar
          </button>
          <button type="button" className="btn btn-cancel">
            <MdCancel /> Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
```

**Fluxo de Validação:**
1. Usuário digita no input
2. `onChange` chama `handleChangeField` (atualiza estado)
3. Usuário sai do campo (onBlur)
4. `validateField` valida o campo individual
5. Usuário clica Salvar
6. `onSubmitForm` valida todo o formulário
7. Se válido, envia para API

---

### 3. Alterar Cidade

**Arquivo:** `views/cidade/Alterar.tsx`

```typescript
export default function AlterarCidade() {
  const {
    model,
    errors,
    handleChangeField,
    validateField,
    onSubmitForm,
    handleCancel,
    getInputClass,
  } = useAlterar();

  return (
    <form onSubmit={(e) => onSubmitForm(e)}>
      <div className="mb-2 mt-4">
        <label>{CIDADE.LABEL.CODIGO}:</label>
        <input
          value={model?.codCidade}
          className={getInputClass(CIDADE.FIELDS.CODIGO)}
          onChange={(e) =>
            handleChangeField(CIDADE.FIELDS.CODIGO, e.target.value)
          }
          onBlur={(e) => validateField(CIDADE.FIELDS.CODIGO, e)}
        />
        {/* Mostra mensagem de erro se existir */}
        {errors?.codCidade && (
          <MensagemErro
            error={errors.codCidade}
            mensagem={errors.codCidadeMensagem}
          />
        )}
      </div>

      {/* Similar para Nome */}

      <button type="submit" className="btn btn-success">
        <FaSave /> Salvar
      </button>
      <button type="button" onClick={handleCancel} className="btn btn-cancel">
        <MdCancel /> Cancelar
      </button>
    </form>
  );
}
```

**Diferença de Criar:**
- Carrega dados da API inicialmente
- Usa `useParams` para pegar ID da URL
- Atualiza em vez de criar

---

### 4. Excluir Cidade

**Arquivo:** `views/cidade/Excluir.tsx`

```typescript
export default function ExcluirCidade() {
  const { idCidade } = useParams<{ idCidade: string }>();
  const [model, setModel] = useState<Cidade | null>(null);

  // Carrega cidade para confirmação
  useEffect(() => {
    if (idCidade) {
      const response = apiGetCidade(idCidade);
      setModel(response.data.dados);
    }
  }, [idCidade]);

  const onSubmitForm = async (e: any) => {
    e.preventDefault();
    if (idCidade) {
      try {
        await apiDeleteCidade(idCidade);
        // Redireciona para lista
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={(e) => onSubmitForm(e)}>
      {/* Mostra dados para confirmar exclusão */}
      <input readOnly disabled value={model?.codCidade} />
      <input readOnly disabled value={model?.nomeCidade} />
      <button type="submit">Confirmar Exclusão</button>
    </form>
  );
}
```

**Lógica:**
1. Mostra dados da cidade (confirmação)
2. Usuário clica Salvar
3. Chama `apiDeleteCidade`
4. Redireciona para lista

---

### 5. Consultar Cidade

**Arquivo:** `views/cidade/Consultar.tsx`

Similar ao Excluir, mas:
- Campos são `readOnly` (só leitura)
- Não tem botão de salvar
- Apenas visualização

---

## 🪝 Custom Hooks

### 1. useCriar Hook

**Arquivo:** `services/cidade/hook/useCriar.tsx`

```typescript
export const useCriar = () => {
  // Estado do modelo (dados do formulário)
  const [model, setModel] = useState<Cidade>(CIDADE.DADOS_INICIAIS);
  
  // Estado dos erros
  const [errors, setErrors] = useState<ErrosCidade>({});

  // Atualiza um campo do modelo
  const handleChangeField = (name: keyof Cidade, value: string) => {
    setModel((prev) => ({ ...prev, [name]: value }));
    
    // Limpa erro do campo quando usuário começa a digitar
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
      [`${name}Mensagem`]: undefined,
    }));
  };

  // Valida um campo individual
  const validateField = (name: keyof Cidade, e: React.FocusEvent<HTMLInputElement>) => {
    let messages: string[] = [];
    const value = model[name];

    switch (name) {
      case CIDADE.FIELDS.CODIGO:
        if (!value) messages.push(CIDADE.INPUT_ERROR.CODIGO.BLANK);
        if (value && typeof value !== "string") 
          messages.push(CIDADE.INPUT_ERROR.CODIGO.STRING);
        break;

      case CIDADE.FIELDS.NOME:
        if (!value || String(value).trim().length === 0) {
          messages.push(CIDADE.INPUT_ERROR.NOME.BLANK);
        }
        if (String(value).length > 0 && String(value).length < 6) {
          messages.push(CIDADE.INPUT_ERROR.NOME.MIN_LEN);
        }
        if (String(value).length > 100) {
          messages.push(CIDADE.INPUT_ERROR.NOME.MAX_LEN);
        }
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: messages.length > 0,
      [`${name}Mensagem`]: messages.length > 0 ? messages : undefined,
    }));
  };

  // Valida TODO o formulário antes de submeter
  const validarFormulario = (): boolean => {
    const newErrors: ErrosCidade = {};
    let isFormValid = true;

    // Valida Código
    const codCidadeMessages = [];
    if (!model.codCidade) {
      codCidadeMessages.push(CIDADE.INPUT_ERROR.CODIGO.VALID);
    }
    if (model.codCidade && typeof model.codCidade !== "string") {
      codCidadeMessages.push(CIDADE.INPUT_ERROR.CODIGO.STRING);
    }
    if (codCidadeMessages.length > 0) {
      newErrors.codCidade = true;
      newErrors.codCidadeMensagem = codCidadeMessages;
      isFormValid = false;
    }

    // Valida Nome
    const nomeCidadeMessages = [];
    if (!model.nomeCidade || model.nomeCidade.trim().length === 0) {
      nomeCidadeMessages.push(CIDADE.INPUT_ERROR.NOME.BLANK);
    }
    if (model.nomeCidade) {
      if (model.nomeCidade.length > 0 && model.nomeCidade.length < 6) {
        nomeCidadeMessages.push(CIDADE.INPUT_ERROR.NOME.MIN_LEN);
      }
      if (model.nomeCidade.length > 100) {
        nomeCidadeMessages.push(CIDADE.INPUT_ERROR.NOME.MAX_LEN);
      }
    }
    if (nomeCidadeMessages.length > 0) {
      newErrors.nomeCidade = true;
      newErrors.nomeCidadeMensagem = nomeCidadeMessages;
      isFormValid = false;
    }

    setErrors(newErrors);
    return isFormValid;
  };

  // Submete formulário
  const onSubmitForm = async (e: any) => {
    e.preventDefault(); // Previne reload da página

    if (!validarFormulario()) {
      console.log("Erro na digitação dos dados");
      return;
    }

    try {
      const response = apiPostCidade(model);
      console.log(response);
      // Aqui deveria redirecionar para lista e mostrar mensagem de sucesso
    } catch (error: any) {
      console.log(error);
    }
  };

  return {
    model,
    errors,
    handleChangeField,
    validateField,
    validarFormulario,
    onSubmitForm,
  };
};
```

**Por que usar Hook?**
- Lógica reutilizável
- Separação de responsabilidades
- Fácil de testar

---

### 2. useAlterar Hook

**Arquivo:** `services/cidade/hook/useAlterar.tsx`

Mais complexo que useCriar:

```typescript
export const useAlterar = () => {
  const { idCidade } = useParams<{ idCidade: string }>();
  const navigate = useNavigate();
  
  const [model, setModel] = useState<Cidade>(CIDADE.DADOS_INICIAIS);
  const [errors, setErrors] = useState<ErrosCidade | null>(null);

  // Busca cidade pela ID e carrega
  useEffect(() => {
    if (idCidade) {
      buscarCidadePorId(idCidade).then((response) => {
        if (response?.cidade) {
          setModel(response.cidade);
          setErrors(response?.errosCidade ?? null);
        }
      });
    }
  }, [idCidade]);

  // Ao submeter, atualiza na API
  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarFormulario()) {
      console.log("Erros nos dados");
      return;
    }

    try {
      await apiPutCidade(idCidade, model);
      // Redireciona para lista
      navigate(ROTA.CIDADE.LISTAR);
    } catch (error) {
      console.log(error);
    }
  };

  // Cancela e volta
  const handleCancel = () => {
    navigate(ROTA.CIDADE.LISTAR);
  };

  // Determina classe CSS do input baseado em erro
  const getInputClass = (name: keyof Cidade): string => {
    if (errors?.[name]) {
      return "form-control is-invalid app-label input-error";
    }
    return "form-control app-label";
  };

  return {
    model,
    errors,
    handleChangeField,
    validateField,
    onSubmitForm,
    handleCancel,
    getInputClass,
  };
};
```

**Diferenças:**
- Carrega dados inicialmente
- `useNavigate` para redirecionar
- `useParams` para pegar ID da URL
- Método PUT em vez de POST

---

## 🗺️ Roteamento

**Arquivo:** `services/router/Router.tsx`

```typescript
import type { RouteObject } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Dashboard from "../../views/Dashboard";
import ListarCidade from "../../views/cidade/Listar";
// ... outros imports

export const routes: RouteObject[] = [
  {
    path: "/sistema",
    element: <Layout />,  // Componente pai
    children: [           // Componentes filhos
      {
        path: "/sistema/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/sistema/cidade/listar",
        element: <ListarCidade />,
      },
      {
        path: "/sistema/cidade/criar",
        element: <CriarCidade />,
      },
      {
        path: "/sistema/cidade/alterar/:idCidade",  // :idCidade = parâmetro
        element: <AlterarCidade />,
      },
      {
        path: "/sistema/cidade/excluir/:idCidade",
        element: <ExcluirCidade />,
      },
      {
        path: "/sistema/cidade/buscar/:idCidade",
        element: <ConsultarCidade />,
      },
    ],
  },
];
```

**App.tsx:**
```typescript
const router = createBrowserRouter(routes);

function App() {
  return (
    <RouterProvider router={router} />
  );
}
```

**Explicação:**
- `RouteObject[]` - Array de rotas
- `children` - Rotas aninhadas renderizam dentro de `<Outlet />`
- `:idCidade` - Parâmetro dinâmico (acessar com `useParams()`)
- `<RouterProvider>` - Ativa roteamento

**Navegação:**
```typescript
import { Link, useNavigate } from "react-router-dom";

// Via Link
<Link to="/sistema/cidade/listar">Listar</Link>

// Via programação (em funções)
const navigate = useNavigate();
navigate(ROTA.CIDADE.LISTAR);
```

---

## 🔄 Fluxo de Dados

### Fluxo de uma Operação CRUD Completa

#### 1. **LISTAR (READ)**
```
Component (Listar.tsx)
    ↓ useEffect
API (apiGetCidades)
    ↓ fetch
Backend (NestJS)
    ↓ response.data.dados
Component setState (cidades)
    ↓ rerender
Table renderiza cidades
```

#### 2. **CRIAR (CREATE)**
```
Component (Criar.tsx)
    ↓ handleChangeField
Input → setState (model)
    ↓ rerender
User vê valor atualizado

    ↓ onSubmit
validarFormulario()
    ↓ if válido
apiPostCidade(model)
    ↓ fetch
Backend cria no DB
    ↓ response
Redirecionar para lista
```

#### 3. **ATUALIZAR (UPDATE)**
```
URL: /alterar/:id
    ↓ useParams
Pega idCidade

    ↓ useEffect
apiGetCidade(idCidade)
    ↓ fetch
Backend retorna dados
    ↓ setState
Form preenche com dados

    ↓ User edita e submete
validarFormulario()
    ↓ if válido
apiPutCidade(idCidade, model)
    ↓ fetch
Backend atualiza no DB
    ↓ navigate
Volta para lista
```

#### 4. **DELETAR (DELETE)**
```
URL: /excluir/:id
    ↓ useParams
Pega idCidade

    ↓ useEffect
apiGetCidade(idCidade)
    ↓ fetch
Backend retorna dados

    ↓ Mostra confirmação
Form com dados readonly

    ↓ User clica confirmar
apiDeleteCidade(idCidade)
    ↓ fetch
Backend deleta do DB
    ↓ response
navigate para lista
```

---

## ✅ Validação de Formulários

### Estratégia de Validação

#### 1. **Validação em Tempo Real (onBlur)**
```typescript
<Input
  onBlur={(e) => validateField(CIDADE.FIELDS.CODIGO, e)}
/>
```
Valida quando usuário sai do campo.

#### 2. **Validação ao Submeter**
```typescript
const onSubmitForm = async (e: any) => {
  if (!validarFormulario()) {
    return; // Não envia se há erros
  }
  // Envia para API
};
```

#### 3. **Estados de Validação**
```typescript
// Campo vazio
error: true
errorMensagem: ["O código deve ser informado"]

// Campo válido
error: false
errorMensagem: []

// Campo não tocado (sem validação visual)
error: undefined
```

#### 4. **Tipos de Validação**
```typescript
// BLANK - Campo vazio
if (!value) messages.push(CIDADE.INPUT_ERROR.CODIGO.BLANK);

// STRING - Tipo incorreto
if (typeof value !== "string") messages.push(...);

// MIN_LEN - Mínimo de caracteres
if (value.length < 6) messages.push(...);

// MAX_LEN - Máximo de caracteres
if (value.length > 100) messages.push(...);
```

#### 5. **Feedback Visual**
```typescript
const getInputClass = useMemo(() => {
  return [
    "form-control",
    hasErrors ? "is-invalid" : "",    // Classe de erro (vermelho)
    isValid ? "is-valid" : "",        // Classe de sucesso (verde)
  ]
  .filter(Boolean)
  .join(" ");
}, [hasErrors, isValid]);
```

---

## 🎓 Perguntas de Prova

### Conceitos Básicos

**1. O que é React?**
R: Uma biblioteca JavaScript para construir interfaces de usuário com componentes reutilizáveis.

**2. Qual a diferença entre `useState` e `useReducer`?**
R: `useState` é para estado simples, `useReducer` para estado complexo com múltiplas ações.

**3. Por que usar TypeScript em React?**
R: Tipagem estática previne erros em tempo de desenvolvimento e melhora documentação do código.

**4. O que é um hook customizado?**
R: Uma função que encapsula lógica reutilizável e usa hooks do React.

---

### React Router

**5. Como passar parâmetros pela URL?**
```typescript
// Rota
<Route path="/alterar/:id" element={<Alterar />} />

// Acessar
const { id } = useParams<{ id: string }>();
```

**6. Qual a diferença entre `<Link>` e `<a>`?**
R: `<Link>` não recarrega a página (SPA), `<a>` recarrega (navegação tradicional).

**7. O que é `<Outlet />`?**
R: Um placeholder que renderiza componentes filhos nas rotas aninhadas.

---

### Validação

**8. Como fazer validação em tempo real?**
R: Usar `onBlur` ou `onChange` para validar campo individual e atualizar estado de erro.

**9. Por que separar validação de campo e validação de formulário?**
R: Campo = feedback instantâneo ao usuário. Formulário = validação final antes de enviar.

**10. Como mostrar múltiplas mensagens de erro?**
```typescript
errorMensagem.map((msg, idx) => (
  <li key={idx}>{msg}</li>
))
```

---

### Axios

**11. Por que centralizar Axios em um arquivo?**
R: Mudanças na API só afetam um lugar, e configuração é reutilizável.

**12. O que é `baseURL` em Axios?**
R: URL base que é preposta a todas as requisições.

---

### Performance

**13. Por que usar `memo`?**
R: Evita rerender desnecessários de componentes.

**14. Por que usar `useCallback`?**
R: Evita criar nova função a cada render, melhorando performance.

**15. Por que usar `useMemo`?**
R: Evita recalcular valores a cada render.

---

### Código

**16. O que faz este código?**
```typescript
const { idCidade } = useParams<{ idCidade: string }>();
```
R: Extrai o parâmetro `idCidade` da URL.

**17. O que faz este código?**
```typescript
setErrors((prev) => ({
  ...prev,
  [name]: messages.length > 0,
}));
```
R: Atualiza estado de erro para um campo específico dinamicamente.

**18. O que faz `e.preventDefault()` no form?**
R: Previne o reload automático da página ao submeter formulário.

---

### Estrutura

**19. Por que usar uma estrutura de pastas por feature?**
R: Facilita manutenção, escalabilidade e localização de código relacionado.

**20. Qual a vantagem de ter `constants/` separado?**
R: Evita duplicação de strings, facilita i18n (internacionalização) e manutenção.

---

### Perguntas Difíceis

**21. Como o React sabe qual elemento foi alterado?**
R: Através da `key` em listas. React compara Virtual DOM com DOM real e atualiza apenas mudanças.

**22. Por que usar `optional chaining` (?.)? Quando usar?**
R: Evita erros quando valor é null/undefined. Use quando acessing propriedades de valores que podem ser null.

**23. Qual a ordem de execução deste código?**
```typescript
useEffect(() => {
  console.log("A");
  return () => console.log("B");
}, []);

console.log("C");
```
R: C (render) → A (efeito) → B (cleanup no unmount)

**24. Como diferenciar validação de campo vs validação de formulário?**
R: Campo = individual durante edição (onBlur), Formulário = todas as validações antes de submeter.

**25. Qual o fluxo ao usuário clicar em "Alterar"?**
R: 
1. Clica em link com ID
2. URL muda para `/alterar/:id`
3. Componente monta e usa `useParams()` para pegar ID
4. `useEffect` dispara e carrega dados da API
5. Form preenche com dados
6. User edita
7. Ao submeter, valida e envia PUT
8. Backend atualiza
9. Redireciona para lista

---

## 📝 Resumo Executivo

### O Projeto em 5 Pontos

1. **Arquitetura:** Feature-based com componentes, hooks customizados, serviços de API
2. **Fluxo:** UI (React) → API (Axios) → Backend (NestJS) → Database
3. **Validação:** Em tempo real (onBlur) + validação final (onSubmit)
4. **Roteamento:** React Router com Layout pai e rotas aninhadas
5. **Estado:** useState para dados, validação em estado local separado

### Quando Usar Cada Hook

| Hook | Quando | Exemplo |
|------|--------|---------|
| useState | Estado simples | `const [name, setName] = useState("")` |
| useEffect | Efeitos colaterais | Buscar dados da API |
| useCallback | Função reutilizável | Passar callback para componente filho |
| useMemo | Valor computado | Determinar se há erros |
| useParams | Parâmetro da URL | `const { id } = useParams()` |
| useNavigate | Redirecionar | `navigate("/sistema/cidade/listar")` |

### Fluxo de Criação

```
User digita → onChange atualiza state
       ↓
User sai do campo → onBlur valida campo
       ↓
User clica Salvar → onSubmit valida tudo
       ↓
validarFormulario() retorna true?
       ├─ SIM → API POST/PUT/DELETE
       └─ NÃO → Mostra erros
       ↓
Response OK?
       ├─ SIM → Navigate para lista
       └─ NÃO → Mostra erro
```

---

## 💻 Como Estudar Efetivamente

### 1. **Entenda os Conceitos**
- Leia este guia completo
- Procure o conceito em cada arquivo
- Entenda o **por quê** não apenas o quê

### 2. **Trace o Fluxo**
Para uma operação como "Criar Cidade":
- Onde começa? `Criar.tsx`
- Qual hook? `useCriar`
- Quais validações? `validateField` + `validarFormulario`
- Qual API? `apiPostCidade`
- O que acontece depois? Redireciona

### 3. **Faça Perguntas**
- Por que usar `memo`?
- Por que separar types em outro arquivo?
- Por que `handleChangeField` limpa erros?

### 4. **Modifique o Código**
- Adicione um novo campo
- Mude uma mensagem de erro
- Adicione uma nova rota

### 5. **Pratique Explicando**
- Explique para alguém o que `useEffect` faz
- Explique o fluxo de validação
- Explique por que o projeto é organizado assim

---

## 📚 Recursos Úteis

### Documentação Oficial
- [React Docs](https://react.dev)
- [React Router Docs](https://reactrouter.com)
- [Axios Docs](https://axios-http.com)
- [TypeScript Docs](https://www.typescriptlang.org/docs)

### Conceitos
- **Controlled Components:** Input controlado por React
- **Uncontrolled Components:** Input controlado pelo DOM
- **Lifting State Up:** Mover state para componente pai
- **Composition:** Usar composição em vez de herança

---

## ✨ Última Dica

**A chave para passar em prova sobre React é:**

1. ✅ Entender **por quê** as coisas são feitas assim
2. ✅ Ser capaz de **traçar fluxo de dados**
3. ✅ Conhecer **quando usar cada hook**
4. ✅ Entender **validação e tratamento de erros**
5. ✅ Saber **como componentes se comunicam**

Não decore código! Entenda a lógica e conceitos.

---

**Bom estudo! 🚀**
