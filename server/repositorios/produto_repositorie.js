const mongoose = require('mongoose');
const Produto = mongoose.model('Produto');
const { tratarDB } = require('../util/tratarErros.js');

const tiposSucessos = {
    post: 'Dados adicionados com sucesso!',
    put: 'Dados atualizados com sucesso!',
    delete: 'Dados removidos com sucesso!'
};

exports.get = () => {
    return tratarDB(async () => {
        const dados = await Produto.find({ ativo: true }, 'titulo slug preco');

        return { ok: true, resposta: dados };
    });
};

exports.getBySlug = (slug) => {
    return tratarDB(async () => {
        const dados = await Produto.findOne({
            slug,
            ativo: true
        }, 'titulo slug preco descricao tags');

        return { ok: true, resposta: dados };
    });
};

exports.getById = (id) => {
    return tratarDB(async () => {
        const dados = await Produto.findById(id);

        return { ok: true, resposta: dados };
    });
};

exports.getByTag = (tag) => {
    return tratarDB(async () => {
        const dados = await Produto.findOne({
            tag,
            ativo: true
        }, 'titulo slug preco descricao tags');

        return { ok: true, resposta: dados };
    });
};

exports.post = (dados) => {
    return tratarDB(async () => {
        const produto = new Produto(dados);
        await produto.save();

        return {
            ok: true,
            resposta: {
                status: 'Sucesso',
                mensagem: tiposSucessos['post']
            }
        };
    });
};

exports.put = (id, dados) => {
    return tratarDB(async () => {
        await Produto.findByIdAndUpdate(id, {
            $set: {
                titulo: dados.titulo,
                descricao: dados.descricao,
                preco: dados.preco,
            }
        });

        return {
            ok: true,
            resposta: {
                status: 'Sucesso',
                mensagem: tiposSucessos['put']
            }
        };
    });
};

exports.delete = (id) => {
    return tratarDB(async () => {
        await Produto.findByIdAndRemove(id);

        return {
            ok: true,
            resposta: {
                status: 'Sucesso',
                mensagem: tiposSucessos['delete']
            }
        };
    })
};
