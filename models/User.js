var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')

var schema = mongoose.Schema

var userSchema = new schema({
    email: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: '/public/img/avatar-default.png'
    },
    bio: {
        type: String,
        default: ''
    },
    gender: {
        type: Number,
        enum: [-1, 0, 1],
        default: -1
    },
    birthday: {
        type: Date
    },
    status: {
        type: Number,
        enum: [0, 1, 2],
        default: 0
    },
    add_time: {
        type: Date,
        default: Date.now
    },
    modify_time: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema)