E-Commerce de Livros
Este é um projeto de e-commerce completo para a venda de livros, desenvolvido com o front-end em React e JavaScript. A aplicação permite que os usuários visualizem produtos, adicionem itens ao carrinho, realizem compras e muito mais. O back-end também foi implementado para gerenciar a autenticação de usuários e realizar o processamento das compras.

📋 Índice
Sobre o Projeto
Funcionalidades
Estrutura do Projeto
Tecnologias Utilizadas
Pré-requisitos
Como Rodar o Projeto
Contribuições
Licença

📖 Sobre o Projeto
Este é um sistema de e-commerce dedicado à venda de livros online. O projeto é dividido em duas partes principais:

Client (Front-End): Interface de usuário construída em React e JavaScript, com uma navegação fluida e dinâmica para visualização de produtos, gerenciamento de carrinho e realização de compras.
Server (Back-End): API em Node.js com Express, responsável pela lógica de autenticação de usuários, manipulação de dados de produtos e gerenciamento de pedidos.
🚀 Funcionalidades
Autenticação de Usuários: Cadastro, login e gerenciamento de sessões.
Listagem de Produtos: Exibição de livros com informações detalhadas.
Detalhes dos Produtos: Visualização de informações adicionais sobre cada livro.
Carrinho de Compras: Adição de livros ao carrinho e visualização do total da compra.
Finalização de Compra: Processamento de pedidos com cálculo de frete e total.
Pesquisa de Produtos: Funcionalidade de busca para facilitar a navegação.
🛠 Tecnologias Utilizadas
Front-End:

React
JavaScript
CSS
Back-End:

Node.js
Express
JWT (JSON Web Tokens) para autenticação
Sequelize (ORM para manipulação de banco de dados)
Banco de Dados:

SQLite3 
📝 Pré-requisitos
Antes de rodar o projeto, certifique-se de ter as seguintes ferramentas instaladas:

Node.js
Git
Banco de Dados: SQLite3 
▶️ Como Rodar o Projeto
1. Clonar o repositório
Clone o repositório e navegue até o diretório do projeto:

bash

git clone https://github.com/pedroccarv/books-fullstack-application
cd books-fullstack-application
2. Configurar o Back-End
Acesse o diretório do servidor:
bash

cd server
Instale as dependências do back-end:
bash
Copiar código
npm install
Configure as variáveis de ambiente copiando o arquivo .env.example para .env e preenchendo com suas configurações:
bash

cp .env.example .env
Execute as migrações do banco de dados para criar as tabelas necessárias:
bash

npx sequelize-cli db:migrate
Inicie o servidor:
bash

npm run dev
O servidor estará rodando em http://localhost:3000

3. Configurar o Front-End
Acesse o diretório do front-end:
bash

cd ../client
Instale as dependências do front-end:
bash

npm install
Inicie o front-end:
bash

npm run dev
O front-end estará disponível em http://localhost:5173
