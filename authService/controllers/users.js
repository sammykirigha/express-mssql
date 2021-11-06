// const bcrypt = require('bcryptjs');
const HttpException = require('../utils/HttpException')
const { validationResult } = require('express-validator')
const {v4: uuidv4} = require("uuid")
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const db = require('../db/db');
const { validateUsers } = require('../helpers/userValidation');
const parseResults = require('../helpers/parserResults');

dotenv.config();

class UserController {

    getAllUsers = async (req, res, next) => {
        let userList = await (await db.exec('getAllUsers')).recordsets[0];

        if (!userList.length) {
            throw new HttpException(404, 'Users not found')
        }

        userList = userList.map(user => {
            const { password, isDeleted, ...userWithoutPassword } = user;
            return userWithoutPassword
        })
        // console.log({userList});

        return res.send(userList)
    };

    getUserById = async (req, res, next) => {
        const id  = req.params.id;
        const user = await (await db.exec('getAllUserById', {id})).recordsets[0][0]
        if (!user) {
            throw new HttpException(404, 'User not found')
        }
        const { password, isDeleted, ...userWithoutPassword } = user;
        return res.send(userWithoutPassword)
    };

    insertUsersAssigned = async (req, res, next) => {
        const { user_id, project_id } = req.body;

        const id = uuidv4()
        console.log({id});
        try {
            await db.exec('insertIntoUsersAssigned', {
                id,
                user_id,
                project_id
            })
            res.send("user assigned to the project")
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Internal Server Error" })
        }

    };

    getUserAssigned = async (req, res, next) => {
        try {
            const results = await (await db.exec('getAllUsersAssigned'))
            const users = parseResults(results)
            res.status(200).json(users)
        } catch (error) {
            console.log(error);
            if (error.message) return res.status(500).json(error)
            res.status(404).json(error)
        }
    }

    deleteUser = async (req, res, next) => {
        const id = req.params.id
        const result = await (await db.exec('deleteUsers', { id })).recordsets

        if (!result) {
            throw new HttpException(404, 'User doest exist')
        }

        res.send('User has being deleted')
    }


    
}

module.exports = new UserController