const { body } = require('express-validator');
const mysql = require("../../models/db.js");

exports.createUser = [
    body('userName')
        .notEmpty()
        .trim()
        .withMessage('userName is required'),
    body('email')
        .notEmpty()
        .trim()
        .isEmail()
        .withMessage('Email is required'),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
    body()
        .custom(async (value, { req }) => {
            const details = { "userName": value['userName'] };
            const flag = await userExists(details);
            console.log(flag);
            if (flag) {
                throw new Error('User already exists');
            }
        })
];

const userExists = async function (details) {

    try {
        let query = "SELECT count(*) 'Total' FROM `users` WHERE `username` = :userName";
        let result = await mysql.query(query, {
            userName: details.userName
        });
        return (result[0].Total > 0);
    } catch (err) {

        return (new Error('Database error!!'));
    }
}

exports.updateUser = [
    body('userName')
        .notEmpty()
        .trim()
        .withMessage('User name is required')
];