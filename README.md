# Projeto de Gerenciamento de Rotas com Next.js e Firebase

Este projeto é uma demonstração de como gerenciar permissões de rotas baseadas no tipo de usuário usando Next.js e Firebase. 
## 📌 Descrição

O projeto permite que diferentes tipos de usuários (como "empresa" e "usuário") acessem diferentes rotas baseadas em suas permissões. Utiliza um componente `Permission` para verificar se um usuário tem permissão para acessar uma determinada rota.

## 🚀 Tecnologias Utilizadas

- Next.js
- React
- Firebase (Firestore & Authentication)

## 📦 Instalação e Uso

### 1. Clone este repositório

\```bash
git clone [link do repositório]
cd [nome do diretório]
\```

### 2. Instale as dependências

\```bash
npm install
\```

ou

\```bash
yarn install
\```

### 3. Configuração do Firebase

- Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
- Instale o firebase em seu projeto - npm i firebase ou yarn i firebase
- Ative o Firestore e o Firebase Authentication (para email e senha)
- Pegue suas credenciais do Firebase e substitua no arquivo \`firebaseConfig\`.

### 4. Execute o projeto

\```bash
npm run dev
\```

ou

\```bash
yarn dev
\```

Acesse \`http://localhost:3000\` no seu navegador.

## 🛠️ Funcionalidades e Código

### 1. Componente Permission

O componente `Permission` verifica se o usuário logado tem acesso à rota desejada com base em sua configuração de permissão. Se o usuário não tiver permissão, uma mensagem é exibida informando-o sobre a falta de permissão.

### 2. Configurações de Rotas

As configurações de rota, presentes em `APP_ROUTES`, especificam quais tipos de usuários têm permissão para acessar determinadas rotas.

### 3. Dashboards de Usuário e Empresa

Existem dashboards específicas para usuários e empresas, e o acesso é restrito com base no tipo de usuário.

## 🤝 Contribuição

Contribuições, issues e solicitações de feature são bem-vindas. Sinta-se à vontade para abrir um pull request ou reportar qualquer problema encontrado.
