const User = require('../models/User') 
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const { BadRequestError,UnauthenticatedError } = require('../errors')

//REGISTER
const register = async (req, res) => {
    const user = await User.create({ ...req.body })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user: { name: user.name }, token})
}


//LOGIN
const login = async(req, res) => {
    const {email, password} = req.body

    if(!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }
    const user = await User.findOne({email})
    if(!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    //compare password
    const isPasswordCorrect = await user.comparePassword(password)
    // cosole.log(`this is ISPASSWORD ${isPasswordCorrect}`)
    console.log(user, isPasswordCorrect)
    if(!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid password 3redentials')
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: {name:user.name}, token})
}


module.exports = {
    register,
    login
}