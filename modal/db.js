/**
 * Created by linxiaojie on 2016/8/23.
 */
let mongoose = require('mongoose')
let Schema = mongoose.Schema
let config = require('../config')
let bcrypt = require('bcryptjs')

let BearSchema = new Schema({
    name: String
})

let UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

UserSchema.pre('save', function (next) {
    let user = this
    if (!user.isModified('password')) {
        return next()
    }
    bcrypt.genSalt(config.SALT_FACTOR, (err, salt) => {
        if (err) {
            return next(err)
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err)
            }
            user.password = hash
            next()
        })
    })
})

UserSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
            return cb(err)
        }
        cb(isMatch)
    })
}

module.exports = {
    Bear: mongoose.model('Bear', BearSchema),
    User: mongoose.model('User', UserSchema)
}