const express = require('express');
const { router } = require('./app');
const authorsRouter = require('./router/authors.router');
const commentsRouter = require('./router/comments.router');
const postsRouter = require('./router/posts.router');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());
app.use(router);
app.use('/authors', authorsRouter);
app.use('/comments', commentsRouter);
app.use('/posts', postsRouter);
app.use(errorHandler);

module.exports = {
    app
};