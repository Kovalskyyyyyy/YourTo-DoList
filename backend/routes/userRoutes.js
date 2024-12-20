const express = require('express');
const router = express.Router();
const { createUser, getUser, updateUser, deleteUser } = require('../controllers/userController');
const authorize = require('../middleware/authorize');
const { check } = require('express-validator');
const validate = require('../middleware/validate');

router.post('/', 
  [
    check('username').not().isEmpty().withMessage('Username is required'),
    check('email').isEmail().withMessage('Valid email is required'),
    validate
  ],
  authorize(['Admin']), 
  createUser
);
router.get('/:id', authorize(['Admin', 'User']), getUser);
router.put('/:id', authorize(['Admin', 'User']), updateUser);
router.delete('/:id', authorize(['Admin']), deleteUser);

module.exports = router;