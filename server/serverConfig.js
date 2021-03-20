// Dependências.
const http = require('http');
const debug = require('debug')('balta:server');

module.exports = (app) => {
    // Função para normalizar porta.
    const normalizarPorta = (valor) => {
        const port = Math.round(Number(valor));

        if (isNaN(port)) return valor;
        if (port >= 0) return port;

        return false;
    };

    // Configurando porta.
    const porta = normalizarPorta(process.env.PORT || '8000');
    app.set('port', porta);

    // Criando servidor
    const server = http.createServer(app);

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

    // Configurando eventos do servidor.
    server.on('error', onError);
    server.on('listening', onListening);

    // Iniciando servidor.
    server.listen(porta);
    console.log(`API rodando na porta ${porta}`);
}