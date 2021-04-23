const db = require('../models');
const jwt = require('jsonwebtoken');

exports.register= async (req, res, next) => {
    try {
        const user = await db.User.create(req.body);
        const { id, username } = user;
        // console.log('from user ',user)

        const token = jwt.sign({id, username}, process.env.JWT_SECRET);

        return res.status(201).json({
            id,
            username,
            token
        });

    } catch(err) {
        if(err.code === 11000){
            err.message = 'sorry, that username is already exist'
        }
        next(err)
    }
};


exports.login = async (req, res, next) => {
    try {
        const user = await db.User.findOne({username: req.body.username});
        const { id, username } = user;

        const valid = await user.comparePasswords(req.body.password);

        if(valid) {
            const token = jwt.sign({id, username}, process.env.JWT_SECRET);

            res.json({
                id,
                username,
                token
            })
        } else {
            throw new Error();
        }
    } catch(err) {
        err.message = 'Invalid username/password'
        next(err);
    }
}