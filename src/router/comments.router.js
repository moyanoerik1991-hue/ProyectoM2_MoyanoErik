const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments.controller');

router.get('/', commentsController.getAll);
router.get('/post/:postId', commentsController.getByPostId);
router.get('/author/:authorId', commentsController.getByAuthorId);
router.get('/:id', commentsController.getById);
router.post('/', commentsController.create);
router.delete('/:id', commentsController.remove);

module.exports = router;