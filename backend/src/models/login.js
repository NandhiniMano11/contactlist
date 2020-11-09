const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    {
      
        emailId: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            required: true,
            default: true
        }
    },
    { timestamps: true },
)

module.exports = mongoose.model('users', User)