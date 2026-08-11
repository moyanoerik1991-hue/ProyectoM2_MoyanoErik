const errorHandler = require("../middleware/errorHandler");
const authorsService = require("../services/authors.service");

// GET - Obtener todos los autores
const getAuthors = async (req, res, next) => {
    try {
        const authors = await authorsService.getAuthors();

        if (!authors || authors.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No se encontraron autores registrados.",
                data: []
            });
        }

        return res.status(200).json({
            success: true,
            count: authors.length,
            data: authors
        });
    } catch (error) {
        next(error);
    }
};

// GET - Obtener un autor por ID
const getAuthorById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const author = await authorsService.getAuthorById(id);

        if (!author) {
            return res.status(404).json({
                success: false,
                message: `No se encontró un autor con el id ${id}.`
            });
        }

        return res.status(200).json({
            success: true,
            data: author
        });
    } catch (error) {
        next(error);
    }
};

// POST - Crear un nuevo autor
const createAuthor = async (req, res, next) => {

    try {
        const { name, email, bio } = req.body;

        // Validación de campos obligatorios
        if (!name || !email) {
            return res.status(400).json({ error: 'name y email son obligatorios' });
        }
        const author = await authorsService.createAuthor({ name, email, bio });
        res.status(201).json(author);
    } catch (err) {
            next(err);
        }
};

// PUT - Actualizar un autor existente
const updateAuthor = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email, bio } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "Los campos 'name' y 'email' son obligatorios."
            });
        }

        const existingAuthor = await authorsService.getAuthorById(id);

        if (!existingAuthor) {
            return res.status(404).json({
                success: false,
                message: `No se encontró un autor con el id ${id}.`
            });
        }

        const updatedAuthor = await authorsService.updateAuthor(id, { name, email, bio });

        return res.status(200).json({
            success: true,
            message: "Autor actualizado correctamente.",
            data: updatedAuthor
        });
    } catch (error) {
        next(error);
    }
};

// DELETE - Eliminar un autor
const deleteAuthor = async (req, res, next) => {
    try {
        const { id } = req.params;

        const existingAuthor = await authorsService.getAuthorById(id);

        if (!existingAuthor) {
            return res.status(404).json({
                success: false,
                message: `No se encontró un autor con el id ${id}.`
            });
        }

        const deletedAuthor = await authorsService.deleteAuthor(id);

        return res.status(200).json({
            success: true,
            message: "Autor eliminado correctamente.",
            data: deletedAuthor
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
};