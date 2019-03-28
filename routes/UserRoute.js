const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');


router.get('/', userController.showAll);
router.post('/', userController.onCreate);
router.post('/edit', userController.onEdit);
router.post('/delete', userController.onDelete);

module.exports = router;