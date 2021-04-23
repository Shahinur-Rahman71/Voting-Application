const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // authorization is fined into the headers option in postman sotware.
    if(req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (errr, decoded) => {
            if(errr) {
                next(Error('Failed to authenticate token'));
            } else {
                req.decoded = decoded;
                next();
            }
        });
        
    } else {
        next(Error('No token provided'));
    }

}