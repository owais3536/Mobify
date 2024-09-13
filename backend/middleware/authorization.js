const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

const authenticateToken = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1];

    try {
        const { userID } = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findOne({ _id: userID }).select('_id');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        req.user = user;

        next();
    } catch (error) {
        res.status(401).json({ error: 'Request is not authorized' });
    }
};

module.exports = authenticateToken;