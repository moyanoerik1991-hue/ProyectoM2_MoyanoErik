const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts.controller');

router.get('/', postsController.getAll);
router.get('/author/:authorId', postsController.getByAuthorId);
router.get('/:id', postsController.getById);
router.post('/', postsController.create);
router.put('/:id', postsController.update);
router.delete('/:id', postsController.remove);

module.exports = router;