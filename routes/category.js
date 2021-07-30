const express = require('express');
const router = express.Router();

const {createCategory, listCategories, removeCategory, categoryById, read} = require('../controllers/categoryController');

router.post('/create', createCategory);
router.get('/categories', listCategories);
router.get('/:categoryId', read);
router.delete('/delete/:categoryId', removeCategory);

router.param('categoryId', categoryById);

module.exports = router;