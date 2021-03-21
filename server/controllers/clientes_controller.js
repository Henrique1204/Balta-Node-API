const { ErroAPI, validarVazio, validarString, validarEmail } = require('../util/validacoesAPI.js');
const cliente = require('../repositorios/cliente_repositorie.js');

exports.get = async (req, res) => {
    try {
        const { ok, resposta } = await cliente.get();

        if (!ok) throw new ErroAPI(null, resposta);

        return res.status(200).send(resposta);
    } catch({ tipo, cod, resposta, message }) {
        if (tipo === 'API') return res.status(cod).send(resposta);

        return res.status(500).send({ status: 'Falha', mensagem: message });
    }
};

exports.post = async (req, res) => {
    const campos = ['nome', 'email', 'senha'];

    try {
        const { body } = req;

        if (validarVazio(body, campos)) throw new ErroAPI(400);

        if (!validarString(body, campos) || !validarEmail(body, ['email'])) throw new ErroAPI(406);

        const { ok, resposta } = await cliente.post(body);

        if (!ok) throw new ErroAPI(null, resposta)

        return res.status(201).send(resposta);
    } catch({ tipo, cod, resposta, message }) {
        if (tipo === 'API') return res.status(cod).send(resposta);

        return res.status(500).send({ status: 'Falha', mensagem: message });
    }
};
