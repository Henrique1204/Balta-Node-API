// Biblioteca mongoose.
const mongoose = require('mongoose');
// Classe que cria os schema do banco de dados.
const Schema = mongoose.Schema;

// Instância do schema.
const schemaPedido = new Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente'
    },
    numero: {
        type: String,
        required: true
    },
    dataCriaco: {
        type: Date,
        required: true,
        default: Date.now()
    },
    status: {
        type: String,
        required: true,
        enum: ['criado', 'finalizado'],
        default: 'criado'
    },
    itens: [{
        quantidade: {
            type: Number,
            required: true,
            default: 1
        },
        preco: {
            type: Number,
            required: true
        },
        produto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Produto'
        }
    }]
});

// Exportação do modelo.
module.exports = mongoose.model('Pedido', schemaPedido);
