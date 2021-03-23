const express = require('express');
const router = express.Router();
const controller = require('../controllers/clientes_controller.js');
const servicoAuth = require('../servicos/servico_auth.js');

router.get('/', controller.get);
router.post('/', controller.post);
router.post('/autenticacao', controller.autenticacao);
router.post('/refreshToken', servicoAuth.autorizar, controller.refreshToken);

module.exports = router;
