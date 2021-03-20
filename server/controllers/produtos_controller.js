const mongoose = require('mongoose');
const Produto = mongoose.model('Produto');

exports.get = async (req, res) => {
    try {
        const dados = await Produto.find({ ativo: true }, 'titulo slug preco');

        return res.status(200).send(dados);
    } catch({ message }) {
        console.log(message);
        return res.status(500).send({ status: 'Falha', mensagem: 'Erro no servidor.' });
    }
};

exports.getBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        const dados = await Produto.findOne({
            slug,
            ativo: true
        }, 'titulo slug preco descricao tags');

        return res.status(200).send(dados);
    } catch({ message }) {
        console.log(message);
        return res.status(500).send({ status: 'Falha', mensagem: 'Erro no servidor.' });
    }
};

exports.getById = async (req, res) => {
    try {
        const dados = await Produto.findById(req.params.id);

        return res.status(200).send(dados);
    } catch({ message }) {
        console.log(message);
        return res.status(500).send({ status: 'Falha', mensagem: 'Erro no servidor.' });
    }
};

exports.getByTag = async (req, res) => {
    try {
        const { tag } = req.params;

        const dados = await Produto.findOne({
            tag,
            ativo: true
        }, 'titulo slug preco descricao tags');

        return res.status(200).send(dados);
    } catch({ message }) {
        console.log(message);
        return res.status(500).send({ status: 'Falha', mensagem: 'Erro no servidor.' });
    }
};

exports.post = async (req, res) => {
    try {
        const produto = new Produto(req.body);
        const response = await produto.save();

        return res.status(201).send({ status: 'Sucesso', mensagem: 'Dados adicionado!' });
    } catch({ message }) {
        console.log(message);
        return res.status(500).send({ status: 'Falha', mensagem: 'Erro no servidor.' });
    }
};

exports.put = async (req, res) => {
    try {
        const { id } = req.params;
        await Produto.findByIdAndUpdate(id, {
            $set: {
                titulo: req.body.titulo,
                descricao: req.body.descricao,
                preco: req.body.preco,
            }
        });

        return res.status(201).send({ status: 'Sucesso', mensagem: 'Dados atualizados!' });
    } catch({ message }) {
        console.log(message);
        return res.status(500).send({ status: 'Falha', mensagem: 'Erro no servidor.' });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await Produto.findByIdAndRemove(id);

        return res.status(201).send({ status: 'Sucesso', mensagem: 'Dados removidos!' });
    } catch({ message }) {
        console.log(message);
        return res.status(500).send({ status: 'Falha', mensagem: 'Erro no servidor.' });
    }
};
