const mongoose = require('mongoose');
const Pedido = mongoose.model('Pedido');
const { tratarDB } = require('../util/tratarErros.js');

exports.get = () => {
    return tratarDB(async () => {
        const dados = await Pedido.find({}, 'numero status')
        .populate('cliente', 'nome').populate('itens.produto', 'titulo');

        return { ok: true, resposta: dados };
    });
};

exports.post = (dados) => {
    return tratarDB(async () => {
        const pedido = new Pedido(dados);
        await pedido.save();

        return {
            ok: true,
            resposta: {
                status: 'Sucesso',
                mensagem: 'Dados adicionados com sucesso!'
            }
        };
    });
};
