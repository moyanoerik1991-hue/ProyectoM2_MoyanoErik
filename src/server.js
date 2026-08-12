const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const { router } = require('./app');
const authorsRouter = require('./router/authors.router');
const commentsRouter = require('./router/comments.router');
const postsRouter = require('./router/posts.router');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../docs/openapi.yaml'));

app.use(express.json());
app.use(router);

app.get('/api/openapi.json', (req, res) => {
  res.json(swaggerDocument);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/authors', authorsRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/posts', postsRouter);

app.use('/authors', authorsRouter);
app.use('/comments', commentsRouter);
app.use('/posts', postsRouter);
app.use(errorHandler);

module.exports = {
    app
};