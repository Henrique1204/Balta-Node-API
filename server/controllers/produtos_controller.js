const mongoose = require('mongoose');
const Produto = mongoose.model('Produto');
const { ErroAPI, isString, isArray } = require('../util/ErroAPI.js');

exports.get = async (req, res) => {
    try {
        const dados = await Produto.find({ ativo: true }, 'titulo slug preco');

        return res.status(200).send(dados);
    } catch({ message }) {
        console.log(message);
        return res.status(502).send({
            status: 'Falha',
            mensagem: 'Erro ao buscar no banco de dados.'
        });
    }
};

exports.getBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
    
        // Validando se campos estão preenchidos.
        if (!slug) throw new ErroAPI(400);

        const dados = await Produto.findOne({
            slug,
            ativo: true
        }, 'titulo slug preco descricao tags');

        if (!dados) throw new ErroAPI(404);

        return res.status(200).send(dados);
    } catch({ tipo, cod, resposta, message }) {
        if (tipo === 'API') return res.status(cod).send(resposta);

        return res.status(502).send({ status: 'Falha', mensagem: 'Erro no banco de dados.' });
    }
};

exports.getById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validando se campos estão preenchidos.
        if (!id) throw new ErroAPI(400);

        const dados = await Produto.findById(id);

        if (!dados) throw new ErroAPI(404);

        return res.status(200).send(dados);
    } catch({ tipo, cod, resposta, message }) {
        if (tipo === 'API') return res.status(cod).send(resposta);

        console.log(message);
        return res.status(500).send({ status: 'Falha', mensagem: 'Erro no servidor.' });
    }
};

exports.getByTag = async (req, res) => {
    try {
        const { tag } = req.params;

        // Validando se campos estão preenchidos.
        if (!tag) throw new ErroAPI(400);

        const dados = await Produto.findOne({
            tag,
            ativo: true
        }, 'titulo slug preco descricao tags');

        if (!dados) throw new ErroAPI(404);

        return res.status(200).send(dados);
    } catch({ tipo, cod, resposta, message }) {
        if (tipo === 'API') return res.status(cod).send(resposta);

        console.log(message);
        return res.status(500).send({ status: 'Falha', mensagem: 'Erro no servidor.' });
    }
};

exports.post = async (req, res) => {
    try {
        const { titulo, descricao, preco, tags, slug } = req.body;

        // Validando se campos estão preenchidos.
        if (!titulo || !descricao || !preco || !tags || !slug) throw new ErroAPI(400);

        // Validando tipos.
        const validacaoString = !isString(titulo) || !isString(descricao) || !isString(slug);
        if (validacaoString || !Array.isArray(tags) || isNaN(preco)) throw new ErroAPI(406);

        const produto = new Produto(req.body);
        await produto.save();

        return res.status(201).send({ status: 'Sucesso', mensagem: 'Dados adicionado!' });
    } catch({ tipo, cod, resposta, message }) {
        if (tipo === 'API') return res.status(cod).send(resposta);

        console.log(message);
        return res.status(500).send({ status: 'Falha', mensagem: 'Erro no servidor.' });
    }
};

exports.put = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descricao, preco } = req.body;

        // Validando se campos estão preenchidos.
        if (!titulo || !descricao || !preco || !id) throw new ErroAPI(400);

        // Validando tipos.
        if (!isString(titulo) || !isString(descricao) || isNaN(preco)) throw new ErroAPI(406);

        await Produto.findByIdAndUpdate(id, {
            $set: {
                titulo: titulo,
                descricao: descricao,
                preco: preco,
            }
        });

        return res.status(201).send({ status: 'Sucesso', mensagem: 'Dados atualizados!' });
    } catch({ tipo, cod, resposta, message }) {
        if (tipo === 'API') return res.status(cod).send(resposta);

        console.log(message);
        return res.status(500).send({ status: 'Falha', mensagem: 'Erro no servidor.' });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await Produto.findByIdAndRemove(id);

        // Validando se campos estão preenchidos.
        if (!id) throw new ErroAPI(400);

        return res.status(201).send({ status: 'Sucesso', mensagem: 'Dados removidos!' });
    } catch({ tipo, cod, resposta, message }) {
        if (tipo === 'API') return res.status(cod).send(resposta);

        console.log(message);
        return res.status(500).send({ status: 'Falha', mensagem: 'Erro no servidor.' });
    }
};
