# 📁 Guia de Estrutura de Projeto Vite + React + TypeScript

## 🎯 Visão Geral

Este documento define o padrão de organização de pastas e arquivos para projetos frontend usando Vite, React e TypeScript. A estrutura é otimizada para projetos novos com foco em escalabilidade e manutenibilidade.

---

## 📂 Estrutura de Pastas

```
project-root/
├── src/
│   ├── assets/                 # Recursos estáticos
│   │   ├── images/            # Imagens, logos, ícones
│   │   └── fonts/             # Fontes customizadas
│   │
│   ├── components/            # Componentes reutilizáveis
│   │   ├── ui/               # Componentes base do Design System
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   └── index.ts      # Barrel export
│   │   └── layout/           # Componentes de estrutura
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       ├── Sidebar.tsx
│   │       └── index.ts
│   │
│   ├── pages/                # Páginas/Views da aplicação
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Dashboard.tsx
│   │   └── NotFound.tsx
│   │
│   ├── hooks/                # Custom hooks reutilizáveis
│   │   ├── useAuth.ts
│   │   ├── useFetch.ts
│   │   └── useLocalStorage.ts
│   │
│   ├── services/             # Lógica de integração externa
│   │   ├── api.ts           # Configuração do cliente HTTP
│   │   ├── userService.ts   # Serviços de usuário
│   │   └── productService.ts
│   │
│   ├── stores/              # Gerenciamento de estado global
│   │   ├── useUserStore.ts
│   │   └── useCartStore.ts
│   │
│   ├── utils/               # Funções utilitárias puras
│   │   ├── formatters.ts    # Formatação de dados
│   │   ├── validators.ts    # Validações
│   │   └── constants.ts     # Constantes da aplicação
│   │
│   ├── types/               # TypeScript types e interfaces
│   │   ├── index.ts
│   │   ├── user.types.ts
│   │   └── api.types.ts
│   │
│   ├── routes/              # Configuração de rotas
│   │   └── index.tsx
│   │
│   ├── styles/              # Estilos globais
│   │   ├── global.css
│   │   └── variables.css
│   │
│   ├── App.tsx              # Componente raiz
│   └── main.tsx             # Entry point
│
├── public/                   # Arquivos públicos (não processados)
│   ├── favicon.ico
│   └── robots.txt
│
├── vite.config.ts           # Configuração do Vite
├── tsconfig.json            # Configuração do TypeScript
├── tsconfig.node.json       # Config TS para Node
├── package.json
├── .env.example             # Exemplo de variáveis de ambiente
├── .gitignore
├── .eslintrc.cjs            # Configuração ESLint
├── .prettierrc              # Configuração Prettier
└── README.md
```

---

## 📝 Convenções de Nomenclatura

### Arquivos e Pastas

| Tipo | Convenção | Exemplo |
|------|-----------|---------|
| Componentes React | `PascalCase.tsx` | `Button.tsx`, `UserCard.tsx` |
| Páginas | `PascalCase.tsx` | `Home.tsx`, `Dashboard.tsx` |
| Hooks | `camelCase.ts` com prefixo `use` | `useAuth.ts`, `useFetch.ts` |
| Serviços | `camelCase.ts` com sufixo `Service` | `userService.ts`, `apiService.ts` |
| Utilitários | `camelCase.ts` | `formatDate.ts`, `validateEmail.ts` |
| Types | `camelCase.types.ts` | `user.types.ts`, `api.types.ts` |
| Stores | `camelCase.ts` com prefixo `use` | `useUserStore.ts` |
| Pastas | `lowercase` ou `kebab-case` | `components/`, `user-profile/` |

---

## 🔍 Descrição Detalhada das Pastas

### `/src/assets/`
**Propósito**: Armazenar recursos estáticos que serão processados pelo Vite.

**O que colocar aqui**:
- Imagens (.png, .jpg, .svg)
- Fontes customizadas (.woff, .woff2, .ttf)
- Ícones que não sejam componentes

**Exemplo**:
```typescript
import logo from '@/assets/images/logo.svg'
import '@/assets/fonts/inter.css'
```

---

### `/src/components/`
**Propósito**: Componentes React reutilizáveis em toda a aplicação.

#### `components/ui/`
Componentes base do design system (botões, inputs, cards, modals).

**Características**:
- Genéricos e altamente reutilizáveis
- Sem lógica de negócio
- Focados em apresentação

**Exemplo** (`Button.tsx`):
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
  onClick?: () => void
}

export const Button = ({ variant = 'primary', children, onClick }: ButtonProps) => {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  )
}
```

**Barrel Export** (`index.ts`):
```typescript
export { Button } from './Button'
export { Input } from './Input'
export { Card } from './Card'
```

#### `components/layout/`
Componentes de estrutura da aplicação (Header, Footer, Sidebar).

**Exemplo** (`Header.tsx`):
```typescript
export const Header = () => {
  return (
    <header className="header">
      <nav>...</nav>
    </header>
  )
}
```

---

### `/src/pages/`
**Propósito**: Componentes de página que representam rotas da aplicação.

**Características**:
- Um componente por rota
- Orquestram outros componentes
- Podem conter lógica de negócio específica da página

**Exemplo** (`Home.tsx`):
```typescript
import { Header } from '@/components/layout'
import { Button } from '@/components/ui'

export const Home = () => {
  return (
    <div>
      <Header />
      <main>
        <h1>Bem-vindo</h1>
        <Button>Começar</Button>
      </main>
    </div>
  )
}
```

---

### `/src/hooks/`
**Propósito**: Custom hooks reutilizáveis que encapsulam lógica compartilhada.

**Exemplo** (`useAuth.ts`):
```typescript
import { useState, useEffect } from 'react'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Lógica de autenticação
  }, [])

  const login = async (credentials) => { /* ... */ }
  const logout = () => { /* ... */ }

  return { user, loading, login, logout }
}
```

---

### `/src/services/`
**Propósito**: Lógica de integração com APIs externas e serviços.

**Exemplo** (`api.ts`):
```typescript
import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptors
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

**Exemplo** (`userService.ts`):
```typescript
import { api } from './api'
import type { User } from '@/types'

export const userService = {
  getAll: async (): Promise<User[]> => {
    const { data } = await api.get('/users')
    return data
  },
  
  getById: async (id: string): Promise<User> => {
    const { data } = await api.get(`/users/${id}`)
    return data
  },
  
  create: async (user: Partial<User>): Promise<User> => {
    const { data } = await api.post('/users', user)
    return data
  }
}
```

---

### `/src/stores/`
**Propósito**: Gerenciamento de estado global da aplicação.

**Exemplo com Zustand** (`useUserStore.ts`):
```typescript
import { create } from 'zustand'
import type { User } from '@/types'

interface UserState {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null })
}))
```

---

### `/src/utils/`
**Propósito**: Funções utilitárias puras sem dependências do React.

**Exemplo** (`formatters.ts`):
```typescript
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR').format(date)
}
```

**Exemplo** (`validators.ts`):
```typescript
export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const isValidCPF = (cpf: string): boolean => {
  // Lógica de validação
  return true
}
```

---

### `/src/types/`
**Propósito**: Definições de tipos e interfaces TypeScript.

**Exemplo** (`index.ts`):
```typescript
export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
  createdAt: Date
}

export interface Product {
  id: string
  title: string
  price: number
  stock: number
}

export type ApiResponse<T> = {
  data: T
  message: string
  success: boolean
}
```

---

### `/src/routes/`
**Propósito**: Configuração centralizada de rotas.

**Exemplo** (`index.tsx`):
```typescript
import { createBrowserRouter } from 'react-router-dom'
import { Home } from '@/pages/Home'
import { About } from '@/pages/About'
import { NotFound } from '@/pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '*',
    element: <NotFound />
  }
])
```

---

## ⚙️ Configuração do Vite

### `vite.config.ts`
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@services': path.resolve(__dirname, './src/services'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
      '@assets': path.resolve(__dirname, './src/assets')
    }
  }
})
```

### `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@pages/*": ["./src/pages/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@services/*": ["./src/services/*"],
      "@stores/*": ["./src/stores/*"],
      "@utils/*": ["./src/utils/*"],
      "@types/*": ["./src/types/*"],
      "@assets/*": ["./src/assets/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

---

## 🔒 Variáveis de Ambiente

### `.env.example`
```env
# API
VITE_API_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000

# Autenticação
VITE_AUTH_TOKEN_KEY=auth_token

# Feature Flags
VITE_ENABLE_ANALYTICS=false
```

### Uso no código:
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

---

## 📦 Barrel Exports (index.ts)

**Benefícios**:
- Imports mais limpos
- Facilita refatoração
- Melhor organização

**Exemplo**:
```typescript
// components/ui/index.ts
export { Button } from './Button'
export { Input } from './Input'
export { Card } from './Card'

// Uso:
import { Button, Input, Card } from '@/components/ui'
// ao invés de:
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
```

---

## 📈 Quando Escalar para Feature-Based?

Considere migrar para arquitetura baseada em features quando:

- ✅ Mais de 30 componentes
- ✅ Time com 3+ desenvolvedores
- ✅ Funcionalidades isoladas e complexas
- ✅ Dificuldade em encontrar arquivos

**Nova estrutura**:
```
src/
├── features/              # NOVO
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   └── dashboard/
│       ├── components/
│       └── hooks/
├── components/           # Mantém componentes compartilhados
├── pages/
└── ...
```

---

## 🛠️ Stack Tecnológica Recomendada

### Core
- **Build Tool**: Vite
- **Framework**: React 18+
- **Linguagem**: TypeScript

### Roteamento
- React Router v6
- TanStack Router (alternativa moderna)

### Estado Global
- Zustand (recomendado para simplicidade)
- Redux Toolkit (para apps complexos)
- Jotai (alternativa atômica)

### Data Fetching
- TanStack Query (React Query)
- SWR
- Axios

### Formulários
- React Hook Form
- Zod (validação)

### Estilização
- TailwindCSS (recomendado)
- Styled Components
- CSS Modules

### Testes
- Vitest
- React Testing Library
- Playwright (E2E)

---

## ✅ Boas Práticas

### 1. Componentes
- ✅ Um componente por arquivo
- ✅ Componentes pequenos e focados
- ✅ Props tipadas com TypeScript
- ✅ Use `const` para componentes funcionais

### 2. Imports
```typescript
// ✅ Correto - usar alias
import { Button } from '@/components/ui'

// ❌ Evitar - caminhos relativos longos
import { Button } from '../../../components/ui/Button'
```

### 3. Nomenclatura
```typescript
// ✅ Componentes - PascalCase
const UserProfile = () => {}

// ✅ Funções - camelCase
const formatUserName = () => {}

// ✅ Constantes - UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com'

// ✅ Types/Interfaces - PascalCase
interface UserData {}
type ApiResponse = {}
```

### 4. Organização de Imports
```typescript
// 1. Bibliotecas externas
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// 2. Imports internos - alias
import { Button } from '@/components/ui'
import { useAuth } from '@/hooks'
import { userService } from '@/services'

// 3. Types
import type { User } from '@/types'

// 4. Estilos
import './styles.css'
```

### 5. Evite
- ❌ Componentes gigantes (>300 linhas)
- ❌ Lógica de negócio em componentes de UI
- ❌ Múltiplas responsabilidades em um arquivo
- ❌ Any no TypeScript
- ❌ Imports circulares

---

## 🚀 Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Preview build
npm run preview

# Lint
npm run lint

# Type check
npm run type-check

# Testes
npm run test
npm run test:watch
npm run test:coverage
```

---

## 📚 Referências

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Router](https://reactrouter.com/)
- [TanStack Query](https://tanstack.com/query/)

---

## 📄 Licença

Este guia é de uso livre para projetos pessoais e comerciais.

---

**Última atualização**: Novembro 2024
**Versão**: 1.0.0