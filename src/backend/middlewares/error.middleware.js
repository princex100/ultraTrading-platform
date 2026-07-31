// TODO: Implement global error handling middleware

export const errorHandler = (err, req, res, next) => {

    console.error("Global error handler caught: ", err);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};
