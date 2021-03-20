exports.get = (req, res) => {
    res.status(200).send({ titulo: 'Produtos' });
};

exports.post = (req, res) => {
    res.status(201).send(req.body);
};

exports.put = (req, res) => {
    res.status(200).send({ id: req.params.id, body: req.body });
};

exports.delete = (req, res) => {
    res.status(200).send({ id: req.params.id });
};