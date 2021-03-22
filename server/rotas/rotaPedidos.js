const express = require('express');
const router = express.Router();
const controller = require('../controllers/pedidos_controller.js');

router.get('/', controller.get);
router.post('/', controller.post);

module.exports = router;
