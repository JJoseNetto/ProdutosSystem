# 🚀 Meu Projeto Frontend Next.js

Um **projeto frontend** feito com **Next.js** e **HeroUI**, que inclui:

* Sistema de **cadastro e login** 🔑
* CRUD completo de **produtos** 🛒
* Gráficos com **Chart.js** 📊
* Dados mockados para demonstração 📝
* Gerenciamento de estado com **Zustand** 🏗️
* Validação de formulários com **Zod** ✅
* Ações seguras com **Next Safe Actions** 🔒
* Ícones com **Heroicons** ✨

Este projeto foi desenvolvido com foco em **boa arquitetura, design moderno e usabilidade**.

---

## 📦 Tecnologias utilizadas

* [Next.js](https://nextjs.org/)
* [React](https://reactjs.org/)
* [HeroUI](https://heroui.dev/)
* [Heroicons](https://heroicons.com/)
* [Chart.js](https://www.chartjs.org/)
* [Zustand](https://zustand-demo.pmnd.rs/)
* [Zod](https://zod.dev/)
* [Next Safe Actions](https://next-safe-action.dev/)
* CSS moderno com Tailwind (via HeroUI)

---

## ⚡ Funcionalidades

* ✅ Cadastro de usuários com validação Zod
* ✅ Login e autenticação
* ✅ CRUD completo de produtos (Create, Read, Update, Delete)
* ✅ Visualização de gráficos com dados mockados
* ✅ Uso de Zustand para gerenciamento global de estado
* ✅ Layout moderno e responsivo
* ✅ Ações seguras com Next Safe Actions (tipadas e com tratamento de erros)

---

## 🛠️ Configuração do ambiente

1. Clone o repositório:

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd <NOME_DO_PROJETO>
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente no arquivo `.env`:

```env
NEXT_PUBLIC_API_BASE_URL=API EM USO
```

4. Rode o projeto em modo de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

Acesse o projeto em [http://localhost:3000](http://localhost:3000) 🌐

---

## 🏗️ Estrutura do projeto

```
├─ /components # Componentes reutilizáveis (inputs, buttons, forms)
├─ /pages # Páginas do Next.js
├─ /store # Estado global com Zustand
├─ /server # Server Actions (Next Safe Actions) 
├─ /utils # Schema e tratamento de erro
├─ /public # Arquivos estáticos (imagens, ícones)
├─ /styles # Estilos globais
```

---

## 📈 Mock de dados

Os gráficos usam dados mockados para demonstração. Você pode substituir pelos dados reais da API configurando `NEXT_PUBLIC_API_BASE_URL`.

---
