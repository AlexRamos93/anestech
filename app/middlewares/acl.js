require('dotenv').config();
const jwt = require('jwt-simple');
const { User } = require('../models');

/**
 * ACCESS CONTROL LIST MIDDLEWARE
 */
const acl = async (req, res, next) => {
    const token = req.get('authorization');

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }

    const payload = jwt.decode(
        token.replace('Bearer ', ''),
        process.env.SECRET
    );

    const user = await User.findOne({ where: { id: payload.id } });

    if (!user.isAdmin) {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }

    next();
};

module.exports = acl;
