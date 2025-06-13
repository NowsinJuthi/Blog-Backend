const jwt = require('jsonwebtoken')

module.exports = (req, resizeBy, next) => {
    const token = req.header('Authorization');
    if(!token) return res.status(401).json({massage:'No token, authozation denied'})
        

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode.user;
            next();
        } catch (error) {
            res.status(401).json({massage:'Token is not valid'})
        }
}