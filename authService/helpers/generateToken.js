const jwt = require('jsonwebtoken')

module.exports = (email, id, isAdmin) => {
    return jwt.sign({
        email, id, isAdmin
    }, process.env.SECRET_JWT, {expiresIn: "24h"})
}