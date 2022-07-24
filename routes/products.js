const express = require('express');

const { getProducts, getProduct, addProduct, updateProduct, deleteProduct, getProdcutsInRadius
  } = require('../controllers/products');

  //include other resource router
const commentRouter = require('./comments');

const router = express.Router();

//re-route into other resource router
router.use('/:productId/comments', commentRouter);

 

  
  router.route('/radius/:zipcode/:distance').get(getProdcutsInRadius)

  router.route('/')
  .get(getProducts)
  .post(addProduct);
  
  router.route('/:id')
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);
  
  module.exports = router;