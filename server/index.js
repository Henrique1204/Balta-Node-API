// Criando aplicação.
const express = require('express');
const app = express();

// Confiruando tipos de entradas.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rota de teste.
const rotaTeste = require('./rotas/rotaTeste.js');
app.use('/', rotaTeste);
// Rota de produtos.
const rotaProdutos = require('./rotas/rotaProdutos.js');
app.use('/produtos', rotaProdutos);

const server = require('./serverConfig.js');
server(app);
