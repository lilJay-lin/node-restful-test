/**
 * Created by linxiaojie on 2016/8/23.
 */
let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let mongoose = require('mongoose')
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

app.use('/api/bears', bear)

let server = app.listen(port, () => {
    let host = server.address().address
    let port = server.address().port
    console.log('server listening at http://%s:%s', host, port)
})

