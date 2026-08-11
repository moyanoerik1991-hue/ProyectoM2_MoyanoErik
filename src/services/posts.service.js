const pool = require('../config/db');

const getPosts = async () => {
    const result = await pool.query('SELECT * FROM posts');
    return result.rows;
};

const getPostById = async (id) => {
    const result = await pool.query(
        'SELECT * FROM posts WHERE id = $1',
        [id]
    );

    return result.rows[0];
};

const getPostsByAuthorId = async (authorId) => {
    const result = await pool.query(
        'SELECT * FROM posts WHERE author_id = $1',
        [authorId]
    );

    return result.rows;
};

const createPost = async (post) => {
    const { title, content, author_id, published } = post;
    const result = await pool.query(
        'INSERT INTO posts (title, content, author_id, published) VALUES ($1, $2, $3, $4) RETURNING *',
        [title, content, author_id, published ?? false]
    );

    return result.rows[0];
};

const updatePost = async (id, post) => {
    const { title, content, author_id, published } = post;
    const result = await pool.query(
        'UPDATE posts SET title = $1, content = $2, author_id = $3, published = $4 WHERE id = $5 RETURNING *',
        [title, content, author_id, published, id]
    );

    return result.rows[0];
};

const deletePost = async (id) => {
    const result = await pool.query(
        'DELETE FROM posts WHERE id = $1 RETURNING *',
        [id]
    );

    return result.rows[0];
};

module.exports = {
    getPosts,
    getPostById,
    getPostsByAuthorId,
    createPost,
    updatePost,
    deletePost
};