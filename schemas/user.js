const { STRING, DATE, INTEGER } = require('sequelize');;
const sequelize = require('../sequelize');

const User = sequelize.define('users', {
    username: {
        type: STRING,
        validate: {
            notContains: ' '
        }
    },
    password: {
        type: STRING
    },
    email: {
        type: STRING,
        validate: {
            isEmail: true
        }
    },
    createdAt: {
        type: DATE
    },
    updatedAt: {
        type: DATE
    }
});

module.exports.User = User;