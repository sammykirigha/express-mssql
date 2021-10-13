const Joi = require('joi')

exports.validateUsers = (user) => {
    const schema = Joi.object().keys({
        username: Joi.string().required(),
        full_name: Joi.string().required(),
        age: Joi.string().min(18).required(),
        gender: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        isAdmin: Joi.bool().required()
    })
}