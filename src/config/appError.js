class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; // Indica que es un error "esperado", no un bug

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;