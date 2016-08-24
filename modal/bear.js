/**
 * Created by linxiaojie on 2016/8/23.
 */
let mongoose = require('mongoose')
let Schema = mongoose.Schema

let BearSchema = new Schema({
    name: String
})

module.exports = mongoose.model('Bear', BearSchema)