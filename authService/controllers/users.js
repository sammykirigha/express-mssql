// const bcrypt = require('bcryptjs');
const HttpException = require('../utils/HttpException')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const db = require('../db/db');

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