
module.exports = {
    ...require('./auth'),
    ...require('./poll')
}

module.exports.errorMsg = (req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err)
}

module.exports.notFound = (err, req, res, next) => {
    res.status(err.status || 400).json({
        message: err.message || 'something went wrong'
    });
}