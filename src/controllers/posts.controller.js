const postsService = require("../services/posts.service");

// GET - Obtener todos los posts
const getAll = async (req, res, next) => {
    try {
        const posts = await postsService.getPosts();

        if (!posts || posts.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No se encontraron posts registrados.",
                data: []
            });
        }

        return res.status(200).json({
            success: true,
            count: posts.length,
            data: posts
        });
    } catch (error) {
        next(error);
    }
};

// GET - Obtener un post por ID
const getById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const post = await postsService.getPostById(id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: `No se encontró un post con el id ${id}.`
            });
        }

        return res.status(200).json({
            success: true,
            data: post
        });
    } catch (error) {
        next(error);
    }
};

// GET - Obtener posts por autor
const getByAuthorId = async (req, res, next) => {
    try {
        const { authorId } = req.params;

        const posts = await postsService.getPostsByAuthorId(authorId);

        if (!posts || posts.length === 0) {
            return res.status(200).json({
                success: true,
                message: `No se encontraron posts para el autor con id ${authorId}.`,
                data: []
            });
        }

        return res.status(200).json({
            success: true,
            count: posts.length,
            data: posts
        });
    } catch (error) {
        next(error);
    }
};

// POST - Crear un nuevo post
const create = async (req, res, next) => {
    try {
        const { title, content, author_id, published } = req.body;

        // Validación de campos obligatorios
        if (!title || !content || !author_id) {
            return res.status(400).json({
                success: false,
                message: "Los campos 'title', 'content' y 'author_id' son obligatorios."
            });
        }

        const post = await postsService.createPost({ title, content, author_id, published });
        res.status(201).json({
            success: true,
            message: "Post creado correctamente.",
            data: post
        });
    } catch (err) {
        if (err.code === '23503') {
            return res.status(400).json({
                success: false,
                message: 'El author_id indicado no existe.'
            });
        }
        next(err);
    }
};

// PUT - Actualizar un post existente
const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, content, author_id, published } = req.body;

        if (!title || !content || !author_id) {
            return res.status(400).json({
                success: false,
                message: "Los campos 'title', 'content' y 'author_id' son obligatorios."
            });
        }

        const existingPost = await postsService.getPostById(id);

        if (!existingPost) {
            return res.status(404).json({
                success: false,
                message: `No se encontró un post con el id ${id}.`
            });
        }

        const updatedPost = await postsService.updatePost(id, { title, content, author_id, published });

        return res.status(200).json({
            success: true,
            message: "Post actualizado correctamente.",
            data: updatedPost
        });
    } catch (error) {
        next(error);
    }
};

// DELETE - Eliminar un post
const remove = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedPost = await postsService.getPostById(id);

        if (!deletedPost) {
            return res.status(404).json({
                success: false,
                message: `No se encontró un post con el id ${id}.`
            });
        }

        return res.status(200).json({
            success: true,
            message: "Post eliminado correctamente.",
            data: deletedPost
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAll,
    getById,
    getByAuthorId,
    create,
    update,
    remove
};