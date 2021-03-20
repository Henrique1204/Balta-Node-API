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

// Gerenciando erros do servidor.
const onError = (e) => {
    if (e.syscall !== 'listen') throw e;

    const bind = typeof porta === 'string' ? `Pipe ${porta}` : `Porta ${porta}`;

    switch (e.code) {
        case 'EACCES':
            console.error(`${bind} | privilegios requeridos.`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} | servidor já está em uso.`);
            process.exit(1);
            break;
        default: throw e;
    }
};

// Implementando o debug.
const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `Pipe ${addr}` : `Porta ${addr.port}`;
    debug(`Escutando na ${bind}`);
}

// Criando servidor.
const server = http.createServer(app);
server.listen(porta);
server.on('error', onError);
server.on('listening', onListening);
console.log(`API rodando na porta ${porta}`);
