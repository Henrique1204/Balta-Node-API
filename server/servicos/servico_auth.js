const jwt = require('jsonwebtoken');
const { ErroAPI } = require('../util/validacoesAPI.js');

exports.gerarToken = (dados) => (
    jwt.sign(dados, global.SALT_KEY, { expiresIn: '1d' })
);

exports.decodificarToken = async (token) => {
    const { _doc } = await jwt.verify(token, global.SALT_KEY);
    return _doc;
};

exports.autorizar = (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (!token) throw new ErroAPI(401);

        jwt.verify(token, global.SALT_KEY, (erro) => {
            if (erro) throw new ErroAPI(403);

            return next();
        });
    } catch({ tipo, cod, resposta, message }) {
        if (tipo === 'API') return res.status(cod).send(resposta);

        return res.status(500).send({ status: 'Falha', mensagem: message });
    }
};

exports.isAdmin = (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (!token) throw new ErroAPI(401);

        jwt.verify(token, global.SALT_KEY, (erro, decoded) => {
            if (erro) throw new ErroAPI(403);

            const { _doc } = decoded;
            if (!_doc.regras.includes('admin')) throw new ErroAPI(403);

            return next();
        });
    } catch({ tipo, cod, resposta, message }) {
        if (tipo === 'API') return res.status(cod).send(resposta);

        return res.status(500).send({ status: 'Falha', mensagem: message });
    }
};
