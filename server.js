/**
 * Created by linxiaojie on 2016/8/23.
 */
let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let mongoose = require('mongoose')
let jwt = require('express-jwt')
let rsaValidation = require('auth0-api-jwt-rsa-validation')
let config = require('./config')
let verifyToken = require('./middleware/redis').verifyToken

let db = mongoose.connection

//mongoose
mongoose.connect('mongodb://localhost/ruru')
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('mongodb is connected')
});
//port
let port = process.env.port || 8080

//router
let bear = require('./router/bear')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//jwt validate token

/*全局校验权限*/
/*app.use(jwt({
    secret: config.SECRET_TOKEN,
    getToken: (req) => {
        var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token']
        return token;
    }
}))*/

/*使用express-jwt校验权限，失效时间等*/
/*
app.use('/api/bears',jwt({
    secret: config.SECRET_TOKEN,
    getToken: (req) => {
        var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token']
        return token;
    }
}), bear)*/
/*自定义中间件校验权限*/
app.use('/api/bears', require('./middleware/jwtauth'), bear)
/*增加redis,用户退出之后失效token*/
/*app.use('/api/bears', require('./middleware/jwtauth'), verifyToken, bear)*/
app.use('/api/user', require('./router/user'))

let server = app.listen(port, () => {
    let host = server.address().address
    let port = server.address().port
    console.log('server listening at http://%s:%s', host, port)
})

