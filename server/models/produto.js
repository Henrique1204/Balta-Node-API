// Biblioteca mongoose.
const mongoose = require('mongoose');
// Classe que cria os schema do banco de dados.
const Schema = mongoose.Schema;

// Instância do schema.
const schemaProduto = new Schema({
    // O campo de id é gerado automaticamente.
    // Definindo um campo.
    titulo: {
        type: String, // Tipo do campo.
        required: true, // Se é obrigatório.
        trim: true // Remove espaços no começo e no final.
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true
    },
    descricao: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true
    },
    ativo: {
        type: Boolean,
        required: true,
        default: true
    },
    tags: [{
        type: String,
        required: true
    }]
});

// Exportação do modelo.
module.exports = mongoose.model('Produto', schemaProduto);
