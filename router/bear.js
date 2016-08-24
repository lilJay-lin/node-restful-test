/**
 * Created by linxiaojie on 2016/8/23.
 */
let express = require('express')
let router = express.Router()
let Bear = require('../modal/bear')

router.use((req, res, next) => {
    console.log('api requesting...')
    next()
})

router.post('/', (req, res) => {
    let bear = new Bear()
    bear.name = req.body.name

    bear.save((err) => {
        if (err) {
            res.send(err)
        }
        res.json({message: 'Bear created'})
    })
}).get('/', (req, res) => {
    Bear.find((err, bears) => {
        if (err) {
            res.send(err)
        }
        res.json(bears)
    })
}).get('/:bear_id', (req, res) => {
    Bear.findById(req.params.bear_id, (err, bear) => {
        if (err) {
            res.send(err)
        }
        res.json(bear)
    })
}).put('/:bear_id', (req, res) => {
    Bear.findById(req.params.bear_id, (err, bear) => {
        if (err) {
            res.send(err)
        }
        bear.name = req.body.name
        bear.save((err) => {
            if (err) {
                res.send(err)
            }
            res.json({message: 'Bear updated'})
        })
    })
}).delete('/:bear_id', (req, res) => {
    Bear.remove({
        _id: req.params.bear_id
    }, function(err, bear) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted' });
    });
})

module.exports = router