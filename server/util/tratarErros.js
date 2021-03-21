const tratarDB = (callBack) => {
    try {
        return callBack();
    } catch ({ message }) {
        return {
            ok: false,
            resposta: {
                cod: 502,
                mensagem: 'Erro ao buscar no banco de dados.',
                erroDB: message
            }
        };
    }
};

module.exports = {
    tratarDB
};
