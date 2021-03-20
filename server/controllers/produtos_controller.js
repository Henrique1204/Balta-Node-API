const mongoose = require('mongoose');
const Produto = mongoose.model('Produto');

exports.get = (req, res) => {
    res.status(200).send({ titulo: 'Produtos' });
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

exports.put = (req, res) => {
    res.status(200).send({ id: req.params.id, body: req.body });
};

exports.delete = (req, res) => {
    res.status(200).send({ id: req.params.id });
};