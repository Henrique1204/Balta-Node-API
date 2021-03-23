const express = require('express');
const router = express.Router();
const controller = require('../controllers/pedidos_controller.js');
const servicoAuth = require('../servicos/servico_auth.js');

router.get('/', servicoAuth.autorizar, controller.get);
router.post('/', servicoAuth.autorizar, controller.post);

module.exports = router;
