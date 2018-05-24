var express = require('express')
var md5 = require('blueimp-md5')
var User = require('./models/user')
var router = express.Router()

router.get('/', function(req, res) {
    console.log(req.session.user)
    res.render('index.html', {
        user: req.session.user
    })
})

router.get('/login', function(req, res) {
    res.render('login.html')
})

router.post('/login', function(req, res) {
    var body = req.body
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
        console.log(user)
        //记录session
        req.session.user = user
        console.log(req.session.user)
        res.status(200).json({
            err_code: 0,
            message: 'ok'
        })

    })
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
        new User(body).save(function(err, user) {
            if (err) {
                return next(err)
            }
            //记录session
            req.session.user = user

            res.status(200).json({
                err_code: 0,
                message: 'ok'
            })
        })

    })
})

router.get('/logout', function(req, res) {
    //清除session
    req.session.user = null
    //跳转到登录
    res.redirect('/login')
})


module.exports = router