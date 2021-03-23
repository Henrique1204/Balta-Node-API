const express = require('express');
const router = express.Router();
const controller = require('../controllers/clientes_controller.js');

router.get('/', controller.get);
router.post('/', controller.post);
router.post('/autenticacao', controller.autenticacao);

module.exports = router;
