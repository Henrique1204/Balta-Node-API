const mongoose = require('mongoose');
const Produto = mongoose.model('Produto');
const { ErroAPI, isString } = require('../util/ErroAPI.js');
const produtoRepo = require('../repositorios/produto_repositorie.js');

exports.get = async (req, res) => {
    try {
        const { ok, resposta } = await produtoRepo.get();

        if (!ok) throw new ErroAPI(null, resposta);

        return res.status(200).send(resposta);
    } catch({ tipo, cod, resposta, message }) {
        if (tipo === 'API') return res.status(cod).send(resposta);

        return res.status(500).send({ status: 'Falha', mensagem: message });
    }
};

exports.getBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
    
        if (!slug) throw new ErroAPI(400);

        const { ok, resposta } = await produtoRepo.getBySlug(slug);

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
        const { id } = req.params;

        if (!id) throw new ErroAPI(400);

        const { ok, resposta } = await produtoRepo.getById(id);

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
        const { tags } = req.params;

        if (!tags) throw new ErroAPI(400);

        const { ok, resposta } = await produtoRepo.getByTag(tags);

        if (!ok) throw new ErroAPI(null, resposta);

        if (!resposta) throw new ErroAPI(404);

        return res.status(200).send(resposta);
    } catch({ tipo, cod, resposta, message }) {
        if (tipo === 'API') return res.status(cod).send(resposta);

        return res.status(500).send({ status: 'Falha', mensagem: message });
    }
};

exports.post = async (req, res) => {
    try {
        const { titulo, descricao, preco, tags, slug } = req.body;

        if (!titulo || !descricao || !preco || !tags || !slug) throw new ErroAPI(400);

        const validacaoString = !isString(titulo) || !isString(descricao) || !isString(slug);
        if (validacaoString || !Array.isArray(tags) || isNaN(preco)) throw new ErroAPI(406);

        const { ok, resposta } = await produtoRepo.post(req.body);

        if (!ok) throw new ErroAPI(null, resposta)

        return res.status(201).send(resposta);
    } catch({ tipo, cod, resposta, message }) {
        if (tipo === 'API') return res.status(cod).send(resposta);

        return res.status(500).send({ status: 'Falha', mensagem: message });
    }
};

exports.put = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descricao, preco } = req.body;

        if (!titulo || !descricao || !preco || !id) throw new ErroAPI(400);

        if (!isString(titulo) || !isString(descricao) || isNaN(preco)) throw new ErroAPI(406);

        const { ok, resposta } = await produtoRepo.put(id, req.body);

        if (!ok) throw new ErroAPI(null, resposta);

        return res.status(200).send(resposta);
    } catch({ tipo, cod, resposta, message }) {
        if (tipo === 'API') return res.status(cod).send(resposta);

        return res.status(500).send({ status: 'Falha', mensagem: message });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) throw new ErroAPI(400);

        const { ok, resposta } = await produtoRepo.delete(id);

        if (!ok) throw new ErroAPI(null, resposta);

        return res.status(200).send(resposta);
    } catch({ tipo, cod, resposta, message }) {
        if (tipo === 'API') return res.status(cod).send(resposta);

        return res.status(500).send({ status: 'Falha', mensagem: message });
    }
};
