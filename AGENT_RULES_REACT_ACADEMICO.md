# Regras e Padrões de Desenvolvimento - React Acadêmico (Manual Técnico Completo)

Você é um agente de IA especializado no projeto **React Acadêmico**. Este documento é a sua regra de sistema definitiva. Ele mapeia toda a estrutura de pastas e fornece exemplos de implementação que você deve seguir obrigatoriamente.

---

## 1. Estrutura Completa de Pastas (`src/`)

O agente deve respeitar a hierarquia abaixo em qualquer nova implementação:

```text
src/
├── assets/             # Imagens, fontes e arquivos estáticos
├── components/         # Componentes transversais reutilizáveis
│   ├── input/          # Ex: Input.tsx (Input customizado com validação)
│   ├── layout/         # Ex: Layout.tsx (Sidebar + Header + Content)
│   └── mensagem/       # Ex: Modais ou alertas de feedback
├── services/           # Camada de Inteligência e Configuração
│   ├── axios/          # Configuração central do Axios (config.axios.ts)
│   ├── constant/       # Constantes globais de sistema (sistema.constants.ts)
│   ├── router/         # Configuração de rotas (Router.tsx e url.ts)
│   └── [dominio]/      # Subpastas por entidade (ex: cidade, aluno)
│       ├── api/        # Chamadas de rede específicas
│       ├── constants/  # Literais, mensagens e labels do domínio
│       ├── hook/       # Lógica (Hooks useCriar, useAlterar, useListar)
│       └── type/       # Interfaces TypeScript da entidade
├── type/               # Tipos globais compartilhados
└── views/              # Camada de Apresentação (JSX)
    └── [dominio]/      # Páginas (Criar.tsx, Listar.tsx, Alterar.tsx)
```

---

## 2. Exemplo de Implementação de um Módulo (Referência Cidade)

Para qualquer domínio, o agente deve gerar os seguintes arquivos seguindo estes padrões exatos:

### 2.1. Tipos (`services/cidade/type/Cidade.ts`)
Define o modelo de dados e o modelo de erros para o formulário.
```typescript
export interface Cidade {
  idCidade?: string;
  codCidade?: string;
  nomeCidade?: string;
}

export interface ErrosCidade {
  codCidade?: boolean;
  codCidadeMensagem?: string[];
  nomeCidade?: boolean;
  nomeCidadeMensagem?: string[];
}
```

### 2.2. Constantes (`services/cidade/constants/cidade.constants.ts`)
Evite textos fixos no código. Centralize tudo aqui.
```typescript
export const CIDADE = {
  ALIAS: "cidade",
  FIELDS: { CODIGO: "codCidade", NOME: "nomeCidade" },
  LABEL: { CODIGO: "Código", NOME: "Nome da Cidade" },
  INPUT_ERROR: {
    NOME: { BLANK: "Nome deve ser informado", MIN_LEN: "Mínimo 6 caracteres" }
  },
  DADOS_INCIAIS: { codCidade: "", nomeCidade: "" }
};
```

### 2.3. API (`services/cidade/api/api.cidade.ts`)
Isola o Axios. Use a constante `ROTA` do router.
```typescript
import { http } from "../../axios/config.axios";
import { ROTA } from "../../router/url";

export const apiPostCidade = async (cidade: any) => {
  return await http.post(ROTA.CIDADE.CRIAR, cidade);
};
```

### 2.4. Hook de Lógica (`services/cidade/hook/useCriar.tsx`)
Onde reside a inteligência. Deve exportar o estado e os handlers.
```typescript
export const useCriar = () => {
  const [model, setModel] = useState<Cidade>(CIDADE.DADOS_INCIAIS);
  const [errors, setErrors] = useState<ErrosCidade>({});

  const handleChangeField = (name: keyof Cidade, value: string) => {
    setModel(prev => ({ ...prev, [name]: value }));
  };

  const validateField = (name: keyof Cidade) => {
    // Lógica de switch(name) para validar campos no onBlur
  };

  const onSubmitForm = async (e: any) => {
    e.preventDefault();
    await apiPostCidade(model);
  };

  return { model, errors, handleChangeField, validateField, onSubmitForm };
};
```

### 2.5. View (`views/cidade/Criar.tsx`)
Apenas estrutura visual. Consome o hook e usa o componente `<Input />`.
```tsx
export default function CriarCidade() {
  const { model, errors, handleChangeField, validateField, onSubmitForm } = useCriar();

  return (
    <form onSubmit={onSubmitForm} className="card animated fadeInDown">
      <Input 
        label={CIDADE.LABEL.NOME}
        value={model.nomeCidade}
        onChange={(e) => handleChangeField("nomeCidade", e.target.value)}
        onBlur={() => validateField("nomeCidade")}
        error={errors.nomeCidade}
        errorMensagem={errors.nomeCidadeMensagem}
      />
      <button type="submit" className="btn btn-success">Salvar</button>
    </form>
  );
}
```

---

## 3. Regras de Componentes Globais

### 3.1. Layout Principal (`src/components/layout/`)
- O `Layout.tsx` utiliza o `<Outlet />` do react-router-dom para renderizar as páginas.
- A navegação lateral (Sidebar) deve usar o componente `<Link />` para evitar recarregamento da página.

### 3.2. Router Automático (`src/services/router/`)
- `url.ts`: Sempre use a função `gerarRotaSistema` para criar o objeto de rotas da entidade.
- `Router.tsx`: Centralize todos os mapeamentos de `@views` aqui dentro do componente `<Routes>`.

---

## 4. Requisitos de Estilo e Animação
- **Animação**: Toda View principal deve ter no container pai as classes `animated fadeInDown`.
- **Botões**: Use o padrão de ícones (`FaSave`, `MdCancel`) dentro de um `span.btn-icon`.
- **Validação**: O componente `Input` deve mudar para a classe `is-invalid` automaticamente dependendo da prop `error`.

### Checklist de Implementação:
1. [ ] Criei a pasta dentro de `services/[dominio]` com as 4 subpastas (`api`, `constants`, `hook`, `type`)?
2. [ ] Isolei toda a lógica de estado no Hook?
3. [ ] A View está usando o componente `<Input />` padrão do projeto?
4. [ ] Registrei as rotas em `url.ts` e linkei no `Router.tsx`?

Este manual deve ser seguido **literalmente**. Qualquer desvio da estrutura de pastas ou da separação View/Logic será considerado erro de implementação.
