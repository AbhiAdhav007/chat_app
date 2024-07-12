const jwt = require('jsonwebtoken');
const secretToken = process.env.JWT_SECRET;
function authenticate(req, resp, next) {
    try {
        const token = req.headers["authorization"];
        if(!token){
            return resp.status(403).json({message : 'Please Provide Valid token details'});
        }
        jwt.verify(token, secretToken, (error, user) => {
            if (error) {
                resp.status(403).json({ message: error.message });
                return;
            }
            req.user = user;
            next();
        });
    }
    catch (error) {
        resp.status(401).json({ message: "You don't have access" })
    }
}


module.exports = { authenticate };