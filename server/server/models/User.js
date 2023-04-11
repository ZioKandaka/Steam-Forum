const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, 'Username must be unique'],

    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    premium: Boolean,
    verified: Boolean,
    donation: Number,
    createdAt: Date,
    updatedAt: Date
})

module.exports = mongoose.model('User', userSchema)