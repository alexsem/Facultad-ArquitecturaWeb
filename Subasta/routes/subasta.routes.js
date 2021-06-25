const { Router } = require('express');

const subastaController = require('../controllers/subasta.controller');

const router = Router();

router.get('/:patente', subastaController.subastaGet );
router.post('/', subastaController.subastaPost );
router.put('/:patente', subastaController.subastaPut );

module.exports = router;