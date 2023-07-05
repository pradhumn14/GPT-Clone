const errorHandler = require('../middlewares/errorMiddleware')
const userModel = require('../models/userModel')
const errorResponse = require('../utils/errorResponse')

// JWT token
exports.sendToken = (user, statusCode) => {
    const token = user.getSignedToken(res)
    res.status(statusCode).json({
        success: true,
        token,
    })
}

// Register Token
exports.registerController = async (req, res, next) => { 
    try {
        const { username, email, password } = req.body
        // existing user
        const existingEmail = await userModel.findOne({email})
        if (existingEmail) {
            return next(new errorResponse('Email is already registered', 500))
        }
        const user = await userModel.create({username, email, password})
        this.sendToken(user, 201, res)
    } catch (error) {
        console.log(error);
        next(error)
    }
}

// Login Token
exports.loginController = async (req, res, next) => {
    try {
        const {email, password} = req.body

        // validation
        if (!email || !password) {
            return next(new errorResponse('Please provide email & password'))
        }

        const user = await userModel.findOne({email})
        if (!user) {
            return next(new errorResponse('Invalid Credential', 401))
        }
        const isMAtch = await userModel.matchPassword(password)
        if (!isMAtch) {
            return next(new errorHandler('Invalid Username or Password', 401))
        }

        // response(res)
        this.sendToken(user, 200, res)
    } catch (error) {
        console.log(error);
        next(error)
        
    }
}

// Logout Token
exports.logoutController = async (req, res) => {
    res.clearCookie('refreshToken')
    return res.status(200).json({
        success: true,
        message: 'successfully logged out'
    })
}