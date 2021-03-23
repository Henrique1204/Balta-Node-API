const express = require('express');
const router = express.Router();
const controller = require('../controllers/produtos_controller.js');
const servicoAuth = require('../servicos/servico_auth.js');

router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/admin/:id', controller.getById);
router.get('/tags/:tags', controller.getByTag);
router.post('/', servicoAuth.autorizar, controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;
