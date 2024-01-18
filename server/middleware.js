const JWT_SECRET = "secret";
var jwt = require("jsonwebtoken");


module.exports = {
    auth: (req, res, next) => {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(403).json({msg: "Missing auth header"});
        }
        const token = req.headers.authorization.split(' ')[1];  // this will extract the token value from authorization header
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded && decoded.id) {
            req.userId = decoded.id;
            next()
        } else {
            return res.status(403).json({msg: "Incorrect token"});
        }
    }
}