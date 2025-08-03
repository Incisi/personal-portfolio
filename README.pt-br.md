<div align="right">
  Read in other languages: <a href="./README.md">🇬🇧 English</a>
</div>

# Portfólio Pessoal de David Incisi

Este é o repositório oficial do meu portfólio pessoal, uma aplicação full-stack construída do zero para exibir minhas habilidades, projetos e jornada profissional. É mais do que um site estático; é uma plataforma dinâmica com gerenciamento de conteúdo e um back-end administrativo seguro.

O site público serve como minha introdução profissional, enquanto a página `/jornada` funciona como um "jardim digital", documentando os cursos, livros e artigos que moldam meu pensamento. Todo o conteúdo é gerenciado através de um painel de administrador seguro e customizado.

---

## ✨ Funcionalidades

- **Conteúdo Dinâmico:** O portfólio busca dinamicamente os projetos fixados da API do GitHub.
- **Seção "Jornada":** Uma área dedicada para exibir o aprendizado contínuo através de cursos, livros e artigos pessoais (blog).
- **Dashboard de Admin Seguro:** Uma rota protegida `/admin` com autenticação baseada em JWT.
- **Gerenciamento de Conteúdo Completo:** Uma interface CRUD (Criar, Ler, Atualizar, Deletar) completa para gerenciar todo o conteúdo dinâmico do site.
- **Formulário de Contato Funcional:** Um endpoint de API que encaminha mensagens do formulário de contato diretamente para o meu e-mail usando Nodemailer.
- **Testes Automatizados:** Uma suíte de testes unitários para a API do back-end para garantir a confiabilidade e qualidade do código.
- **Design Responsivo:** Uma UI polida e totalmente responsiva que funciona perfeitamente em todos os dispositivos.

---

## 🛠️ Tecnologias Utilizadas

| Backend (API) | Frontend (Web) |
| :--- | :--- |
| ![NestJS](https://img.shields.io/badge/-NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white) | ![React](https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=white) |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) | ![Vite](https://img.shields.io/badge/-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) |
| ![TypeORM](https://img.shields.io/badge/-TypeORM-E0234E?style=for-the-badge) | ![CSS Modules](https://img.shields.io/badge/-CSS_Modules-000000?style=for-the-badge&logo=css-modules&logoColor=white) |
| ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white) | ![Framer Motion](https://img.shields.io/badge/-Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white) |
| ![JWT](https://img.shields.io/badge/-JSON_Web_Tokens-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white) | ![Axios](https://img.shields.io/badge/-Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white) |
| ![Jest](https://img.shields.io/badge/-Jest-C21325?style=for-the-badge&logo=jest&logoColor=white) | ![React Router](https://img.shields.io/badge/-React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) |

---

## 🚀 Começando

Siga estas instruções para obter uma cópia do projeto rodando na sua máquina local para propósitos de desenvolvimento e teste.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v18 ou superior recomendado)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)
- Uma instância do [PostgreSQL](https://www.postgresql.org/) ativa

### Guia de Instalação

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/incisi/personal-portfolio.git](https://github.com/incisi/personal-portfolio.git)
    cd personal-portfolio
    ```

2.  **Configure o Backend (`portfolio-backend`):**

    ```bash
    cd portfolio-backend
    npm install
    ```

    > **Importante:** Você deve configurar suas variáveis de ambiente.
    >
    > -   Renomeie o arquivo `.env.example` para `.env`.
    > -   Abra o arquivo `.env` e preencha todas as credenciais necessárias: detalhes da sua conexão com o banco de dados PostgreSQL, seu nome de usuário e Personal Access Token (PAT) do GitHub, suas credenciais de e-mail SMTP (para o formulário de contato), e um `JWT_SECRET` único.

3.  **Configure o Frontend (`personal-portfolio-frontend`):**

    ```bash
    cd ../personal-portfolio-frontend
    npm install
    ```

    > **Importante:** Configure a variável de ambiente do front-end.
    >
    > -   Renomeie o arquivo `.env.local.example` para `.env.local`.
    > -   O valor padrão `VITE_API_BASE_URL=http://localhost:3000` está correto para desenvolvimento local.

---

## 🏃 Executando a Aplicação

Este é um projeto full-stack, então você precisará executar os servidores de back-end e front-end simultaneamente em dois terminais separados.

**Terminal 1: Iniciar o Servidor Back-end**

```bash
cd portfolio-backend
npm run start:dev
```

A API estará disponível em `http://localhost:3000`.

**Terminal 2: Iniciar o Servidor Front-end**

```bash
cd personal-portfolio-frontend
npm run dev
```

O front-end estará disponível em `http://localhost:5173`.

---

## ✅ Executando os Testes

O back-end inclui uma suíte de testes unitários para garantir que a lógica da API está funcionando corretamente.

Para executar os testes, navegue até o diretório do back-end e use o seguinte comando:

```bash
cd portfolio-backend
npm run test
```

## 👤 Autor

**David Incisi dos Santos**

-   GitHub: [@incisi](https://github.com/incisi)
-   LinkedIn: [in/incisi](https://linkedin.com/in/incisi)