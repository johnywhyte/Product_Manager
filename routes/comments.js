const express = require('express');

const { getComments, getComment, addComment, updateComment, deleteComment
  } = require('../controllers/comments');

  const router = express.Router({ mergeParams: true });

  router.route('/')
  .get(getComments)
  .post(addComment);
  
  router.route('/:id')
  .get(getComment)
   .put(updateComment)  
 .delete(deleteComment);

  module.exports = router;