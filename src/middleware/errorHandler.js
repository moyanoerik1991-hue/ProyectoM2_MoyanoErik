const errorHandler = (error, req, res, next) => {
    // Log interno para vos (nunca lo ve el usuario final)
    console.error(`[ERROR] ${req.method} ${req.originalUrl} -`, error);

    let statusCode = error.statusCode || 500;
    let message = error.message || "Ocurrió un error inesperado.";

    // --- Errores comunes de PostgreSQL (identificados por error.code) ---

    switch (error.code) {
        case "23505": // unique violation
            statusCode = 409;
            message = "Ya existe un registro con ese valor (dato duplicado).";
            break;

        case "23503": // foreign key violation
            statusCode = 400;
            message = "El registro relacionado no existe.";
            break;

        case "23502": // not null violation
            statusCode = 400;
            message = `El campo "${error.column}" es obligatorio.`;
            break;

        case "22P02": // invalid text representation (ej: mandar texto donde va un número/UUID)
            statusCode = 400;
            message = "Uno de los datos enviados tiene un formato inválido.";
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

    // --- Respuesta final al cliente ---
    return res.status(statusCode).json({
        success: false,
        message,
        // Solo mostramos detalles técnicos en desarrollo, nunca en producción
        ...(process.env.NODE_ENV === "development" && {
            code: error.code,
            detail: error.detail,
            stack: error.stack
        })
    });
};

module.exports = errorHandler;