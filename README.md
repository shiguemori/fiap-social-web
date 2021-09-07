# FIAP SOCIAL WEB

### Configurando a aplicação
Você deve ter o acesso ao repositorio em node para isso clone o repo  
``git clone https://github.com/rafanleme/fiap-social.git``

Ao configurar o app node configure o banco de dados, rode suas migrations 
e seed com sequilizer

```
sequelize db:migrate
sequelize db:seed:all
```

Isso vai criar o banco e popular a tabela de categoria, crie seu usuario e no .env.development
coloque as informacoes para o login, como o exemplo

```
REACT_APP_EMAIL=shiguemori@hotmail.com
REACT_APP_PASSWORD=123456
```

Para rodar o app basta instalar as dependecias ``npm i`` e depois ``npm start``
A aplicacao vai estar em ``localhost:3000`` e a node estara rodando em ``localhost:3333``
