const bcrypt = require('bcryptjs');
const HttpException = require('../utils/HttpException.utils')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const UserModel = require('../models/user.models');
dotenv.config();

class UserController {

    getAllUsers = async (req, res, next) => {
        let userList = await UserModel.find();

        if (!userList.length) {
            throw new HttpException(404, 'Users not found')
        }

        userList = userList.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword
        })

        res.send(userList)
    };

    getUserById = async (req, res, next) => {
        const id  = req.params.id;
        const user = await UserModel.findOne(id);
        if (!user) {
            throw new HttpException(404, 'User not found')
        }
        const { password, ...userWithoutPassword } = user;
        res.send(userWithoutPassword)
    };

    deleteUser = async (req, res, next) => {
        const id = req.params.id
        // console.log(id);

        const result = await UserModel.delete(id)

        if (!result) {
            throw new HttpException(404, 'User doest exist')
        }

        res.send('User has being deleted')
    }

    createUser = async (req, res, next) => {
        this.checkValidation(req);
        await this.hashPassword(req);

        const user = req.body
        // console.log('user is equal:', user);
        const result = await UserModel.create(user)
        // console.log('result>>>>>>>>',result);

        if (!result) {
            throw new HttpException(500, 'Something went wrong')
        }

        res.status(201).send('User was created')
    }

    userLogin = async (req, res, next) => {
        this.checkValidation(req);
        
        const { email, password: pass } = req.body;
        console.log('email',email, pass);

        const user = await UserModel.findOneByEmail(email);
        // console.log('user:', user);

        if (!user) {
            throw new HttpException('Unable to login')
        }

        // const isMatch = await bcrypt.compare(pass, user.password)

        // if (!isMatch) {
        //     throw new HttpException(401, 'Incorrect password')
        // }

        const sescretKey = process.env.SECRET_JWT || "";
        const token = jwt.sign({ user_id: user.id.toString() }, sescretKey, { expiresIn: '24h' });

        const { password, ...userWithoutPassword } = user;

        res.send({...userWithoutPassword, token})
    }


    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(404, 'Validation failed', errors)
        }
    }
    hashPassword = async (req) => {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 8)
        }
    }
}

module.exports = new UserController