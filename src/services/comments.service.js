const pool = require('../config/db');

const getComments = async () => {
    const result = await pool.query('SELECT * FROM comments ORDER BY id');
    return result.rows;
};

const getCommentById = async (id) => {
    const result = await pool.query(
        'SELECT * FROM comments WHERE id = $1',
        [id]
    );

    return result.rows[0];
};

const getCommentsByPostId = async (postId) => {
    const result = await pool.query(
        'SELECT * FROM comments WHERE post_id = $1 ORDER BY id',
        [postId]
    );

    return result.rows;
};

const getCommentsByAuthorId = async (authorId) => {
    const result = await pool.query(
        'SELECT * FROM comments WHERE author_id = $1 ORDER BY id',
        [authorId]
    );

    return result.rows;
};

const createComment = async (comment) => {
    const { content, post_id, author_id } = comment;
    const result = await pool.query(
        'INSERT INTO comments (content, post_id, author_id) VALUES ($1, $2, $3) RETURNING *',
        [content, post_id, author_id]
    );

    return result.rows[0];
};

const deleteComment = async (id) => {
    const result = await pool.query(
        'DELETE FROM comments WHERE id = $1 RETURNING *',
        [id]
    );

    return result.rows[0];
};

module.exports = {
    getComments,
    getCommentById,
    getCommentsByPostId,
    getCommentsByAuthorId,
    createComment,
    deleteComment
};