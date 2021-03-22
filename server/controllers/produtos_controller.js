const { ErroAPI, validarVazio, validarString } = require('../util/validacoesAPI.js');
const produto = require('../repositories/produto_repository.js');

exports.get = async (req, res) => {
    try {
        const { ok, resposta } = await produto.get();

        if (!ok) throw new ErroAPI(null, resposta);

        return res.status(200).send(resposta);
    } catch({ tipo, cod, resposta, message }) {
        if (tipo === 'API') return res.status(cod).send(resposta);

        return res.status(500).send({ status: 'Falha', mensagem: message });
    }
};

exports.getBySlug = async (req, res) => {
    try {
        if (validarVazio(req.params, ['slug'])) throw new ErroAPI(400);

        const { ok, resposta } = await produto.getBySlug(req.params.slug);

        if (!ok) throw new ErroAPI(null, resposta);

        if (!resposta) throw new ErroAPI(404);

        return res.status(200).send(resposta);
    } catch({ tipo, cod, resposta, message }) {
        if (tipo === 'API') return res.status(cod).send(resposta);

        return res.status(500).send({ status: 'Falha', mensagem: message });
    }
};

exports.getById = async (req, res) => {
    try {
        if (validarVazio(req.params, ['id'])) throw new ErroAPI(400);

        const { ok, resposta } = await produto.getById(req.params.id);

        if (!ok) throw new ErroAPI(null, resposta);

        if (!resposta) throw new ErroAPI(404);

        return res.status(200).send(resposta);
    } catch({ tipo, cod, resposta, message }) {
        if (tipo === 'API') return res.status(cod).send(resposta);

        return res.status(500).send({ status: 'Falha', mensagem: message });
    }
};

exports.getByTag = async (req, res) => {
    try {
        if (validarVazio(req.params, ['tags'])) throw new ErroAPI(400);

        const { ok, resposta } = await produto.getByTag(req.params.tags);

        if (!ok) throw new ErroAPI(null, resposta);

        if (!resposta) throw new ErroAPI(404);

        return res.status(200).send(resposta);
    } catch({ tipo, cod, resposta, message }) {
        if (tipo === 'API') return res.status(cod).send(resposta);

        return res.status(500).send({ status: 'Falha', mensagem: message });
    }
};

exports.post = async (req, res) => {
    const validacoes = {
        vazio: ['titulo', 'descricao', 'preco', 'tags', 'slug'],
        string: ['titulo', 'descricao', 'slug']
    };

    try {
        const { body } = req;

        if (validarVazio(body, validacoes.vazio)) throw new ErroAPI(400);

        const isString = validarString(body, validacoes.string);
        if (!isString || isNaN(body.preco) || !Array.isArray(body.tags)) throw new ErroAPI(406);

        const { ok, resposta } = await produto.post(body);

        if (!ok) throw new ErroAPI(null, resposta)

        return res.status(201).send(resposta);
    } catch({ tipo, cod, resposta, message }) {
        if (tipo === 'API') return res.status(cod).send(resposta);

        return res.status(500).send({ status: 'Falha', mensagem: message });
    }
};

exports.put = async (req, res) => {
    const validacoes = {
        vazio: ['titulo', 'descricao', 'preco', 'id'],
        string: ['titulo', 'descricao']
    };

    try {
        const { id } = req.params;
        const { body } = req;

        if (validarVazio({ ...body, id }, validacoes.vazio)) throw new ErroAPI(400);

        if (!validarString(body, validacoes.string) || isNaN(body.preco)) throw new ErroAPI(406);

        const { ok, resposta } = await produto.put(id, req.body);

        if (!ok) throw new ErroAPI(null, resposta);

        return res.status(200).send(resposta);
    } catch({ tipo, cod, resposta, message }) {
        if (tipo === 'API') return res.status(cod).send(resposta);

        return res.status(500).send({ status: 'Falha', mensagem: message });
    }
};

exports.delete = async (req, res) => {
    try {
        if (validarVazio(req.params, ['id'])) throw new ErroAPI(400);

        const { ok, resposta } = await produto.delete(req.params.id);

        if (!ok) throw new ErroAPI(null, resposta);

        return res.status(200).send(resposta);
    } catch({ tipo, cod, resposta, message }) {
        if (tipo === 'API') return res.status(cod).send(resposta);

        return res.status(500).send({ status: 'Falha', mensagem: message });
    }
};
