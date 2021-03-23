const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');
const { tratarDB } = require('../util/tratarErros.js');

exports.get = () => {
    return tratarDB(async () => {
        const dados = await Cliente.find({}, 'nome email senha');

        return { ok: true, resposta: dados };
    });
};

exports.post = (dados) => {
    return tratarDB(async () => {
        const cliente = new Cliente(dados);
        await cliente.save();

        return {
            ok: true,
            resposta: {
                status: 'Sucesso',
                mensagem: 'Dados adicionados com sucesso!'
            }
        };
    });
};

exports.autenticacao = ({ email, senha }) => {
    return tratarDB(async () => {
        const dados = await Cliente.findOne({ email, senha }, 'nome email');

        return { ok: true, resposta: dados };
    });
};

exports.findById = (id) => {
    return tratarDB(async () => {
        const dados = await Cliente.findById(id, 'nome email');

        return { ok: true, resposta: dados };
    });
};
