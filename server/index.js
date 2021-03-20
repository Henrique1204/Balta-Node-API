// Pacotes para criação do servidor.
const http = require('http');
const express = require('express');

// Criando aplicação.
const app = express();

// Função para normalizar porta.
const normalizarPorta = (valor) => {
    const port = Math.round(Number(valor));

    if (isNaN(port)) return valor;
    if (port >= 0) return port;

    return false;
};

const porta = normalizarPorta(process.env.PORT || '8000');
app.set('port', porta);

// Pacote para debug.
const debug = require('debug')('nodestr:server');

// Criando rotas da aplicação.
const router = express.Router();

// Primeira rota.
router.get('/', (req, res, next) => {
    res.status(200).send({ titulo: 'Node REST API', versao: '1.0.0' });
});

app.use('/', router);

// Criando servidor.
const server = http.createServer(app);
server.listen(porta);
console.log(`API rodando na porta ${porta}`);
