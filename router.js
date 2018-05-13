var express = require('express')
var router = express.Router()

router.get('/', function(req, res) {
    console.log('首页')
    res.end('首页')
})

router.get('/login', function(req, res) {

    // return res.status(500).json({
    //     err_code: 500,
    //     message: '500错误'
    // })

    console.log('登录')
    res.end('登录')
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