// Criando aplicação.
const express = require('express');
const app = express();
const config = require('./config.js');

// Confiruando tipos de entradas.
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: false }));

// Configurando CORS.
const cors = require('cors');
app.use(cors({ origin: true, credentials: true}));

// Banco de dados.
const mongoose = require('mongoose');

mongoose.connect(config.connectionString, {
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

// Rota de clientes.
const rotaClientes = require('./rotas/rotaClientes.js');
app.use('/clientes', rotaClientes);

// Rota de pedidos.
const rotaPedidos = require('./rotas/rotaPedidos.js');
app.use('/pedidos', rotaPedidos);

// Criando servidor.
const server = require('./serverConfig.js');
server(app);
