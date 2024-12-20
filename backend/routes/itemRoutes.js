const express = require('express');
const router = express.Router();
const { createItem, updateItem, deleteItem } = require('../controllers/itemController');

router.post('/', createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

module.exports = router;