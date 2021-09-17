const HttpException = require('../utils/HttpException.utils');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const UserModel = require('../models/user.models')
dotenv.config()

const auth = () => {
    return async function (req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            const bearer = 'Bearer'

            if (!authHeader || !authHeader.startsWith(bearer)) {
                throw new HttpException(401, 'Access denied. No credentials sent!')
            }

            const token = authHeader.replace(bearer, '');
            const secretKey = process.env.SECRET_JWT;
            //verify token
            const decoded = jwt.verify(token, secretKey);
            const user = await UserModel.findOne({ id: decoded.user_id });

            if (!user) {
                throw new HttpException(401, 'Authentication failed')
            }

            const ownerAuthorized = req.params.id == user_id;

            if (!ownerAuthorized) {
                throw new HttpException(401, 'Unauthorized')
            }
            req.currentUser = user
            next()
        } catch (e) {
            e.status = 401
            next(e)
        }
    }
}

module.exports = auth