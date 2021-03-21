const mensagensErro = {
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
        this.mensagem = erro?.mensagem || mensagensErro[`${cod}`];
        this.erroDB = erro?.erroDB || null;
        this.tipo = 'API';

        if (erro?.erroDB) {
            this.resposta = { status: 'Falha', mensagem: this.mensagem, erro: this.erroDB };
        } else {
            this.resposta = { status: 'Falha', mensagem: this.mensagem };
        }
    }
};

const validarVazio = (body, campos) => {
    let isVazio = false;

    campos.forEach((campo) => {
        const valor = body[campo];

        if (valor === undefined || valor === null || valor === "") isVazio = true;
    });

    return isVazio;
};

const validarString = (body, campos) => {
    let isString = true;

    campos.forEach((campo) => {
        const valor = body[campo];

        if (typeof valor !== 'string') isString = false;
    });

    return isString;
};

const validarBoolean = (body, campos) => {
    let isBoolean = true;

    campos.forEach((campo) => {
        const valor = body[campo];

        if (typeof valor !== 'boolean') isBoolean = false;
    });

    return isBoolean;
};

const validarArray = (body, campos) => {
    let isArray = true;

    campos.forEach((campo) => {
        const valor = body[campo];

        if (Array.isArray(valor)) isArray = false;
    });

    return isArray;
};

const validarNaN = (body, campos) => {
    let naoNumero = false;

    campos.forEach((campo) => {
        const valor = body[campo];

        if (isNaN(valor)) naoNumero = true;
    });

    return naoNumero;
};

const validarEmail = (body, campos) => {
    let isEmail = true;

    campos.forEach((campo) => {
        const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

        if (!regex.test(body[campo])) isEmail = false;
    });

    return isEmail
};

module.exports = {
    ErroAPI,
    validarVazio,
    validarString,
    validarBoolean,
    validarArray,
    validarNaN,
    validarEmail
};