const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res, next) => {
    const { username, email, password } = req.body;
    User.find({ email: email }).then(existingUser => {
        if (existingUser.length > 0) {
            const error = new Error("User with this email already exists");
            error.statusCode = 409;
            throw error;
        }
        else {
            bcrypt.hash(password, 10).then(hashedPassword => {
                const newUser = new User({
                    username: username,
                    email: email,
                    password: hashedPassword
                });
                newUser.save().then(user => {
                    const token = jwt.sign({ email: user.email, id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    res.status(200).send({ token: token, userid: user._id.toString(), username: user.username });
                });
            })
        }
    }).catch(error => next(error));
}

exports.loginUser = (req, res, next) => {
    let existingUser;
    const password = req.body.password;
    User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 401;
            throw error;
        }
        existingUser = user;
        return bcrypt.compare(password, user.password);
    }).then(isEqual => {
        if (!isEqual) {
            const error = new Error("Incorrect Password");
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).send({ token: token, userid: existingUser._id.toString(), username: existingUser.username });
    }).catch(error => next(error));
}