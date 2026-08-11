const errorHandler = (error, req, res, next) => {
    console.error(`[ERROR] ${req.method} ${req.originalUrl} -`, error);

    let statusCode = error.statusCode || 500;
    let message = error.message || "Ocurrió un error inesperado.";

    switch (error.code) {
        case "23505": // unique violation
            statusCode = 409;
            if (error.table === "authors" && error.constraint?.includes("email")) {
                message = "Ya existe un autor registrado con ese email.";
            } else {
                message = "Ya existe un registro con ese valor (dato duplicado).";
            }
            break;

        case "23503": // foreign key violation
            statusCode = 400;
            if (error.table === "posts") {
                message = "El author_id indicado no corresponde a ningún autor existente.";
            } else if (error.table === "comments") {
            if (error.constraint?.includes("post_id")) {
                message = "El post_id indicado no corresponde a ningún post existente.";
            } else if (error.constraint?.includes("author_id")) {
                message = "El author_id indicado no corresponde a ningún autor existente.";
                } else {
                    message = "El registro relacionado no existe.";
                }
            } else {
                message = "El registro relacionado no existe.";
            }
            break;

        case "23502": // not null violation
            statusCode = 400;
            message = `El campo "${error.column}" es obligatorio y no puede estar vacío.`;
            break;

        case "22P02": // invalid text representation
            statusCode = 400;
            message = "El id enviado no tiene un formato válido (debe ser un número).";
            break;

        case "42703": // undefined column
            statusCode = 500;
            message = "Error interno: columna no encontrada en la base de datos.";
            break;

        case "42P01": // undefined table
            statusCode = 500;
            message = "Error interno: tabla no encontrada en la base de datos.";
            break;

        case "ECONNREFUSED":
            statusCode = 503;
            message = "No se pudo conectar con la base de datos. Intenta más tarde.";
            break;
    }

    return res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === "development" && {
            code: error.code,
            detail: error.detail,
            stack: error.stack
        })
    });
};

module.exports = errorHandler;