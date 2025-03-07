const message = require('../utilites/message');
const jwt = require('jsonwebtoken');
const response = require('../utilites/apiResponse');
require.env.config();

const authMiddleware = (req, res, next) =>{
    const authToken = req.headers.authorization;

    if(!authToken){
        return response.error(res, {stauts:403, message:message.AUTH.TOKEN_MISSING});
    }
    try{
        const token = authToken.split(' ')[1];
        if(!process.env.JWT_SECRET){
            return response.error(res, {stauts:500, message:"JWT_SECRET not found in env file"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

    } catch(err){
        return response.error(res, {stauts:401, message:message.AUTH.INVALID_TOKEN});
    }
};

module.exports = authMiddleware;