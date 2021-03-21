// Criando aplicação.
const express = require('express');
const app = express();

// Confiruando tipos de entradas.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Banco de dados.
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/loja', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

// Carregando models.
const Produto = require('./models/produto.js');
const Cliente = require('./models/cliente.js');
const Pedido = require('./models/pedido.js');

// Rota de teste.
const rotaTeste = require('./rotas/rotaTeste.js');
app.use('/', rotaTeste);

// Rota de produtos.
const rotaProdutos = require('./rotas/rotaProdutos.js');
app.use('/produtos', rotaProdutos);

// Criando servidor.
const server = require('./serverConfig.js');
server(app);
