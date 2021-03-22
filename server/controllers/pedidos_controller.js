const { Guid } = require('js-guid');
const { ErroAPI } = require('../util/validacoesAPI.js');
const pedido = require('../repositories/pedido_repository.js');

exports.get = async (req, res) => {
    try {
        const { ok, resposta } = await pedido.get();

        if (!ok) throw new ErroAPI(null, resposta);

        return res.status(200).send(resposta);
    } catch({ tipo, cod, resposta, message }) {
        if (tipo === 'API') return res.status(cod).send(resposta);

        return res.status(500).send({ status: 'Falha', mensagem: message });
    }
};

exports.post = async (req, res) => {
    try {
        const { ok, resposta } = await pedido.post({
            cliente: req.body.cliente,
            numero: Guid.newGuid().toString().substring(0, 6),
            itens: req.body.itens
        });

        if (!ok) throw new ErroAPI(null, resposta)

        return res.status(201).send(resposta);
    } catch({ tipo, cod, resposta, message }) {
        if (tipo === 'API') return res.status(cod).send(resposta);

        return res.status(500).send({ status: 'Falha', mensagem: message });
    }
};
