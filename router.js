var express = require('express')
var router = express.Router()

router.get('/', function(req, res) {
    res.render('index.html')
})

router.get('/login', function(req, res) {
    res.render('login.html')
})

router.post('/login', function(req, res) {
    var body = req.body
    console.log(body)
    res.status(200).json({
        err_code: 0,
        message: 'ok'
    })
})

router.get('/logout', function(req, res) {
    console.log('退出')
    res.end('退出')
})

router.get('/register', function(req, res) {
    console.log('注册')
    res.end('注册')
})


module.exports = router