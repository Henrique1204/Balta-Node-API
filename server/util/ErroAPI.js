const mensagem = {
    '400': 'Dados incompletos.',
    '401': 'Token não informado.',
    '403': 'Você não tem autorização necessária para continuar.',
    '404': 'Dados não encontrados.',
    '406': 'Dados inválidos.',
    '422': 'Informações já existem no banco de dados.',
    '502': 'Erro ao realizar operação no banco de dados.'
};

class ErroAPI {
    constructor(cod, erro) {
        this.cod = cod || erro?.cod;
        this.mensagem = erro?.mensagem || mensagem[`${cod}`];
        this.erroSQL = erro?.erroSQL || null;
        this.tipo = 'API';

        if (erro?.erroSQL) {
            this.resposta = { status: 'Falha', mensagem: this.mensagem, erro: this.erroSQL };
        } else {
            this.resposta = { status: 'Falha', mensagem: this.mensagem };
        }
    }
};

const isString = (valor) => (typeof valor === 'string');

module.exports = {
    ErroAPI,
    isString
}