var express = require('express')
var md5 = require('blueimp-md5')
var User = require('./models/user')
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
    //查询user
    User.findOne({
        email: body.email,
        password: md5(md5(body.password))
    }, function(err, user) {
        console.log(err);
        console.log(user);
        if (err) {
            return next(err)
        }

        if (!user) {
            return res.status(200).json({
                err_code: 1,
                message: 'invalid Email or Password'
            })
        }

        res.status(200).json({
            err_code: 0,
            message: 'ok'
        })

    })
})

router.get('/logout', function(req, res) {
    console.log('退出')
    res.end('退出')
})

router.get('/register', function(req, res) {
    res.render('register.html')
})

router.post('/register', function(req, res) {
    var body = req.body
    User.findOne({
        $or: [{
            email: body.email
        }, {
            nickname: body.nickname
        }]
    }, function(err, data) {
        if (err) {
            return next(err)
        }
        //是否存在
        if (data) {
            return res.status(200).json({
                err_code: 1,
                message: 'email or nickname is exists'
            })
        }
        //注册
        body.password = md5(md5(body.password))
        new User(body).save(function(err,user){
            if(err){
                return next(err)
            }
            res.status(200).json({
                err_code: 0,
                message: 'ok'
            })
        })        

    })
})


module.exports = router