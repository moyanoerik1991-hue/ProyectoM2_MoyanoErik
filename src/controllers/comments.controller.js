const commentsService = require("../services/comments.service");

// GET - Obtener todos los comentarios
const getAll = async (req, res, next) => {
    try {
        const comments = await commentsService.getComments();

        if (!comments || comments.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No se encontraron comentarios registrados.",
                data: []
            });
        }

        return res.status(200).json({
            success: true,
            count: comments.length,
            data: comments
        });
    } catch (error) {
        next(error);
    }
};

// GET - Obtener un comentario por ID
const getById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const comment = await commentsService.getCommentById(id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: `No se encontró un comentario con el id ${id}.`
            });
        }

        return res.status(200).json({
            success: true,
            data: comment
        });
    } catch (error) {
        next(error);
    }
};

// GET - Obtener comentarios de un post
const getByPostId = async (req, res, next) => {
    try {
        const { postId } = req.params;

        const comments = await commentsService.getCommentsByPostId(postId);

        if (!comments || comments.length === 0) {
            return res.status(200).json({
                success: true,
                message: `No se encontraron comentarios para el post con id ${postId}.`,
                data: []
            });
        }

        return res.status(200).json({
            success: true,
            count: comments.length,
            data: comments
        });
    } catch (error) {
        next(error);
    }
};

// GET - Obtener comentarios de un autor
const getByAuthorId = async (req, res, next) => {
    try {
        const { authorId } = req.params;

        const comments = await commentsService.getCommentsByAuthorId(authorId);

        if (!comments || comments.length === 0) {
            return res.status(200).json({
                success: true,
                message: `No se encontraron comentarios para el autor con id ${authorId}.`,
                data: []
            });
        }

        return res.status(200).json({
            success: true,
            count: comments.length,
            data: comments
        });
    } catch (error) {
        next(error);
    }
};

// POST - Crear un nuevo comentario
const create = async (req, res, next) => {
    try {
        const { content, post_id, author_id } = req.body;

        // Validación de campos obligatorios
        if (!content || !post_id || !author_id) {
            return res.status(400).json({
                success: false,
                message: "Los campos 'content', 'post_id' y 'author_id' son obligatorios."
            });
        }

        const comment = await commentsService.createComment({ content, post_id, author_id });

        return res.status(201).json({
            success: true,
            message: "Comentario creado correctamente.",
            data: comment
        });
    } catch (error) {
        next(error); // el errorHandler traduce 23503 (post_id o author_id inexistente), 23502, etc.
    }
};

// DELETE - Eliminar un comentario
const remove = async (req, res, next) => {
    try {
        const { id } = req.params;

        const existingComment = await commentsService.getCommentById(id);

        if (!existingComment) {
            return res.status(404).json({
                success: false,
                message: `No se encontró un comentario con el id ${id}.`
            });
        }

        const deletedComment = await commentsService.deleteComment(id);

        return res.status(200).json({
            success: true,
            message: "Comentario eliminado correctamente.",
            data: deletedComment
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAll,
    getById,
    getByPostId,
    getByAuthorId,
    create,
    remove
};