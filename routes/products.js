const express = require('express');
const router = express.Router();

const {createProduct, listProducts, removeProduct, updateProduct, photo, productById, read} = require('../controllers/productsController');

//GET
router.get('/products', listProducts);
router.get('/photo/:productId', photo);
router.get('/:productId', read);

//POST
router.post('/create', createProduct);

//PUT
// router.put('/edit/:productId', updateProduct);

//DELETE
router.delete('/delete/:productId', removeProduct);

//
router.param('productId', productById);

module.exports = router;
