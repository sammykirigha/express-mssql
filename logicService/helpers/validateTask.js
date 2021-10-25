const Joi = require('joi');


exports.validateTask = (task) => {
    const schema = Joi.object().keys({
        task_name: Joi.string().required(),
        start_date: Joi.date().required(),
        duration: Joi.string().required(),
        description: Joi.string().required(),
        status: Joi.string().required(),
        project_id: Joi.string().required(),
        user_id: Joi.string().required()
    })

    return schema.validate(task)
}