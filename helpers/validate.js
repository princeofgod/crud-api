const {check} = require('express-validator');
const User = require('../models/users')

exports.validateData = [
    check('firstname').notEmpty().withMessage('Firstname has to be supplied!'),
    check('lastname').notEmpty().withMessage('Lastname has to be supplied!'),
    check('email').notEmpty().withMessage('email has to be supplied!').custom(async value => {
        await User.findOne({email:value}).then(user => {
            if(user){
                throw new Error("E-mail already in use. Duplicate regisration with email not allowed!!!")
            }
        })
    }),
]

exports.validateSearch = [
    check('email').notEmpty().withMessage('The only search parametr allowed for now is the email!')
]

exports.validateUpdate = [
    check('email').notEmpty().withMessage('Email cannot be empty!').isEmail().withMessage("Please provide a valid email!!!")
]