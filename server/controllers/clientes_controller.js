const { ErroAPI, validarVazio, validarString, validarEmail } = require('../util/validacoesAPI.js');
const cliente = require('../repositories/cliente_repository.js');
const md5 = require('md5');
const servicoEmail = require('../servicos/servico_email.js');
const servicoAuth = require('../servicos/servico_auth.js');

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

        const { ok, resposta } = await cliente.post({
            ...body,
            senha: md5(body.senha + global.SALT_KEY)
        });

        if (!ok) throw new ErroAPI(null, resposta)

        await servicoEmail.send(
            body.email,
            'Bem-vindo ao Node Store',
            global.EMAIL_TMPL.replace('{0}', body.nome)
        );

        return res.status(201).send(resposta);
    } catch({ tipo, cod, resposta, message }) {
        if (tipo === 'API') return res.status(cod).send(resposta);

        return res.status(500).send({ status: 'Falha', mensagem: message });
    }
};

exports.autenticacao = async (req, res) => {
    const campos = ['email', 'senha'];

    try {
        const { body } = req;

        if (validarVazio(body, campos)) throw new ErroAPI(400);

        if (!validarString(body, campos)) throw new ErroAPI(406);

        const { ok, resposta } = await cliente.autenticacao({
            ...body,
            senha: md5(body.senha + global.SALT_KEY)
        });

        if (!ok) throw new ErroAPI(null, resposta);

        const token = await servicoAuth.gerarToken({ ...resposta });

        return res.status(201).send({ auth: true, token, dados: resposta });
    } catch({ tipo, cod, resposta, message }) {
        if (tipo === 'API') return res.status(cod).send(resposta);

        return res.status(500).send({ status: 'Falha', mensagem: message });
    }
};

exports.refreshToken = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const { _id } = await servicoAuth.decodificarToken(token);

        const { ok, resposta } = await cliente.findById(_id);

        if (!ok) throw new ErroAPI(null, resposta);
        if (!resposta) throw new ErroAPI(404);

        const tokenDados = await servicoAuth.gerarToken({ ...resposta });

        return res.status(201).send({ auth: true, token: tokenDados, dados: resposta });
    } catch({ tipo, cod, resposta, message }) {
        if (tipo === 'API') return res.status(cod).send(resposta);

        return res.status(500).send({ status: 'Falha', mensagem: message });
    }
};
