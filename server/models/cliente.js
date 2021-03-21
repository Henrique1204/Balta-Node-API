// Biblioteca mongoose.
const mongoose = require('mongoose');
// Classe que cria os schema do banco de dados.
const Schema = mongoose.Schema;

// Instância do schema.
const schemaCliente = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    }
});

// Exportação do modelo.
module.exports = mongoose.model('Cliente', schemaCliente);
