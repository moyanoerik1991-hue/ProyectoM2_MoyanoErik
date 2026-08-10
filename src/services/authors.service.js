const pool = require('../config/db');

const getAuthors = async () => {
    const result = await pool.query('SELECT * FROM authors');
    return result.rows;
};

const getAuthorById = async (id) => {
    const result = await pool.query(
        'SELECT * FROM authors WHERE id = $1',
        [id]
    );

    return result.rows[0];
};

const createAuthor = async (author) => {
    const { name, email, bio } = author;
    const result = await pool.query(
        'INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *',
        [name, email, bio]
    );

    return result.rows[0];
};

const updateAuthor = async (id, author) => {
    const { name, email, bio } = author;
    const result = await pool.query(
        'UPDATE authors SET name = $1, email = $2, bio = $3 WHERE id = $4 RETURNING *',
        [name, email, bio, id]
    );

    return result.rows[0];
};

const deleteAuthor = async (id) => {
    const result = await pool.query(
        'DELETE FROM authors WHERE id = $1 RETURNING *',
        [id]
    );

    return result.rows[0];
};

module.exports = {
    getAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
};