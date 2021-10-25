const Joi = require("joi");
const bcrypt = require('bcrypt')
const argon2 = require('argon2')
const _ = require("lodash")
const {v4: uuidv4} = require("uuid")
const db = require('../db/db');
const generateToken = require("../helpers/generateToken");
const { validateUsers } = require("../helpers/userValidation");



module.exports = {
    loginUser: async (req, res) => {
        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required()
        });

        const { error } = schema.validate(req.body);

        if (error) return res.status(400).send({ success: false, message: error.details[[0].message] })
        
        const { email, password } = req.body;

        const { recordset } = await db.exec('getUserByEmail', { email });

        const user = recordset[0]

        if (!user) return res.status(404).send({ message: "Account does not exist" })
        
        // const validPassword = await bcrypt.compare(password, user.password)
        // console.log({validPassword});
        // if (!validPassword) return res.status(404).send({ message: "Invalid email or password" })
        
        const token = generateToken(user.email, user.id, user.isAdmin);
        const { isDeleted, ...userInformation } = user
        res.send({...userInformation, token})
        res.send({
            user: _.pick(user, [
                "id",
                "username",
                "full_name",
                "email",
                "gender",
                "age",
                "isAdmin"
             ]), token
        })
    },

    registerUser: async (req, res) => {
        // const { error } = validateUsers(req.body);

        // if (error) return res.status(400).send({ success: false, message: error.details[0].message })
        
        const { recordset } = await db.exec("getUserByEmail", { email: req.body.email })
        
        const user = recordset[0];

        if (user) return res.status(400).send({ message: "Account exists with the given email" })
        
        const salt = await bcrypt.genSalt(10);
        const password = await (await bcrypt.hash(req.body.password, salt));
        const { username, full_name, email, gender, age, isAdmin } = req.body
        
        const id = uuidv4()
        const admin = isAdmin ? 1 : 0
        
        try {
            await db.exec('userRegister', {
                id,
                username,
                full_name,
                password,
                email,
                gender,
                age,
                isAdmin: admin
            })

            await (await db).query("INSERT INTO dbo.registration_queue (user_id, isSent) VALUES('" + id + "', 0)");
            res.send({message: "User registerd successfully"})
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Internal Server Error"})
        }
    }
}

