const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const config = require('config')

// Function to check if username exixst
const checkUserNameExists = async (username) => {
    if (await User.findOne({
        username
    })) {
        return true
    } else {
        return false
    }
}

router.post('/signup', async (req, res) => {
    try {
        let { username, password } = req.body
        if (await checkUserNameExists(username)) {
            return res.json({
                status: false,
                message: "Username already exisits"
            })
        }
        let user = new User();
        user.username = username;
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)
        user.password = hash
        await user.save()
        return res.json({
            status: true,
            message: `User created successfully with username ${username}`,
            user
        })
    } catch (err) {
        console.log(err)
        return res.json({
            status: false,
            message: err.message
        })
    }
})

router.post('/login', async (req, res) => {
    try {
        let { username, password } = req.body
        let user = await User.findOne({
            username
        })
        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                let token = jwt.sign({
                    _id: user._id,
                    username: user.username
                }, config.JWT_ENC_KEY);
                return res.json({
                    status: true,
                    message: "User logined .......",
                    data: {
                        username: user.username,
                        token: token
                    }
                })
            } else {
                return res.json({
                    status: false,
                    message: "User login failed"
                })
            }
        } else {
            return res.json({
                status: false,
                message: "user not found"
            })
        }
    }
    catch (err) {
        console.log(err)
        return res.json({
            status: false,
            message: err.message
        })
    }
})

module.exports = router;