// Criando aplicação.
const express = require('express');
const app = express();

// Criando rotas da aplicação.
const router = express.Router();

// Primeira rota.
router.get('/', (req, res, next) => {
    res.status(200).send({ titulo: 'Node REST API', versao: '1.0.0' });
});

app.use('/', router);

const server = require('./serverConfig.js');
server(app);
