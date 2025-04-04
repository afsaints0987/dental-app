export const errorHandler = (err, res, message) => {
    console.log(err.stack)

    const statusCode = err.statusCode || 500

    res.status(statusCode).json({
        success: false,
        message: message || err.msg
    })
}