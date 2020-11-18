const sequelize = require('./../db/sequelizeconfig')
const { QueryTypes } = require('sequelize')
const { v4: uuidv4 } = require('uuid');
const passwordService = require('./passwordService')

class DaoService {
    constructor() {

    }

    async testConnection() {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    async getUser(user) {
        try {
            let { email, password } = user
            let QUERY = "SELECT * FROM users WHERE email = :email"
            let users = await sequelize.query(QUERY, {
                type: QueryTypes.SELECT,
                replacements: {
                    email
                }
            })
            users = Array.from(users)
            if (users.length == 0) {
                throw new Error('user does not exist')
            } else if (users.length > 1) {
                throw new Error('There are multiple record for the credential')
            } else {
                let hashed_password = users[0].password
                let isMatched = await passwordService.verifyPassword(password, hashed_password)
                if (!isMatched) {
                    throw new Error('The email, password is not valid')
                } else {
                    return {
                        id: users[0].id,
                        email: users[0].email
                    }
                }
            }
        } catch (err) {
            throw err
        }
    }

    async createUser(user) {
        try {
            let { email, password } = user
            password = passwordService.hashPassword(password)
            let id = uuidv4()
            let QUERY = "INSERT INTO users VALUES (:id, :email, :password)"
            const [results, metadata] = await sequelize.query(QUERY, {
                type: QueryTypes.INSERT,
                replacements: {
                    id,
                    email,
                    password
                }
            })
            return {
                id,
                email
            }
        } catch (err) {
            throw err
        }
    }
}

module.exports = new DaoService()