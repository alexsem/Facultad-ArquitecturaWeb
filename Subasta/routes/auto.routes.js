const { Router } = require('express');

const autoController = require('../controllers/auto.controller');

const router = Router();

router.get('/', autoController.autoGet );
router.get('/:patente', autoController.autoGetByPatente );
router.post('/', autoController.autoPost );
router.put('/:patente', autoController.autoPut );
router.delete('/:patente', autoController.autoDelete );

module.exports = router;
