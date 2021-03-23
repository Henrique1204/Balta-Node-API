const jwt = require('jsonwebtoken');
const { ErroAPI } = require('../util/validacoesAPI.js');

exports.gerarToken = (dados) => (
    jwt.sign(dados, global.SALT_KEY, { expiresIn: '1d' })
);

exports.decodificarToken = async (token) => {
    const dados = await jwt.verify(token, global.SALT_KEY);
    return dados;
};

exports.autorizar = (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (!token) throw new ErroAPI(401);

        jwt.verify(token, global.SALT_KEY, function(erro, decoded) {
            if (erro) throw new ErroAPI(403);

            req.userId = decoded.id;
            return next();
        });
    } catch({ tipo, cod, resposta, message }) {
        if (tipo === 'API') return res.status(cod).send(resposta);

        return res.status(500).send({ status: 'Falha', mensagem: message });
    }
};
