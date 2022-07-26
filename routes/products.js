const express = require('express');

const { getProducts, getProduct, addProduct, updateProduct, deleteProduct, getProdcutsInRadius, productImageUpload
  } = require('../controllers/products');

  //include other resource router
const commentRouter = require('./comments');

const router = express.Router();

const { protect } = require('../middleware/auth');


//re-route into other resource router
router.use('/:productId/comments', commentRouter);

 
router.route('/:id/image').put(productImageUpload);

  
  router.route('/radius/:zipcode/:distance').get(getProdcutsInRadius)

  router.route('/')
  .get(getProducts)
  .post(protect, addProduct);
  
  router.route('/:id')
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);
  
  module.exports = router;