const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const { User } = require('../models')

const authentication = (req, res , next ) => {
    const { token } = req.headers
    const privateKey = process.env.PRIVATEKEY
    if(!token) return res.status(400).json({msg: 'token not found'})
    try {
        const decoded = jwt.verify(token, privateKey);
        req.userDataValid = decoded
        console.log(decoded)
        User.findByPk(req.userDataValid.id)
        .then(data => {
        if(!data) {
            return res.status(403).json({msg: "Token is Expired"})
        } else {
            console.log('Authenticated')
            next()
        }
        })
    } catch(err) {
        // err
        return res.status(403).json({ msg: "Not Authenticated" })
    }
}

module.exports = authentication