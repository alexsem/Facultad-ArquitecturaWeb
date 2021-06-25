const { Router } = require('express');

const usuarioController = require('../controllers/usuario.controller');

const router = Router();

router.get('/:user', usuarioController.usuarioGet );
router.post('/', usuarioController.usuarioPost );
router.put('/:user', usuarioController.usuarioPut );
router.delete('/:user', usuarioController.usuarioDelete );

module.exports = router;