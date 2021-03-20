const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send({ titulo: 'Node Rest API', versao: '1.0.0' });
});

router.post('/', (req, res) => {
    res.status(201).send(req.body);
});

router.put('/:id', (req, res) => {
    res.status(201).send({ id: req.params.id, body: req.body });
});

router.delete('/:id', (req, res) => {
    res.status(201).send({ id: req.params.id });
});

module.exports = router;
