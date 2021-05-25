const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-z]+$/
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: Array
    },
    role: {
        type: String,
        default: "user"
    }
})

module.exports = mongoose.model('User', userSchema)