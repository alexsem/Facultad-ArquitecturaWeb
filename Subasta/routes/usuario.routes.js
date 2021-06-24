const { Router } = require('express');

const usuarioController = require('../controllers/usuario.controller');

const router = Router();

router.get('/:patente', usuarioController.usuarioGet );
router.post('/', usuarioController.usuarioPost );
router.put('/:patente', usuarioController.usuarioPut );
router.delete('/:patente', usuarioController.usuarioDelete );

module.exports = router;