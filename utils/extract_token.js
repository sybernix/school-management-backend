module.exports = {
    extractToken: function (req, res, next) {
        // Get auth header value
        const bearerHeader = req.headers['authorization'];
        // Check if bearer is undefined
        if(typeof bearerHeader !== 'undefined') {
            // Split at the space
            const bearer = bearerHeader.split(' ');
            // Get token from array & get the token
            req.token = bearer[1];
            // Next middleware
            next();
        } else {
            // Forbidden
            res.sendStatus(403);
        }
    }
};