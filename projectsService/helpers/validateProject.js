const Joi = require('joi');


exports.validateProject = (project) => {
    const schema = Joi.object().keys({
        project_name: Joi.string().required(),
        start_date: Joi.date().required(),
        duration: Joi.string().required(),
        description: Joi.string().required(),
        team_lead: Joi.string().required(),
        initial_activity: Joi.string().required()
    })

    return schema.validate(project)
}