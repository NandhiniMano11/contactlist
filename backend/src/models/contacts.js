const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    {
        profileimage: {
            type: String,
            required: false
        },
        basicinfo: {
            type: String,
            required: true,
            default:"dummy"
        },
        tags: {
            type: Array,
            required: false
        },
        comapny: {
            type: String,
                required: false
        },
        leadscore: {
            type: String,
            required: false
        },
        phone: {
            type: String,
            required: true
        },
        incomingcallcount:{
            type: Number,
            required: true,
            default:0
        },
        outcomingcallcount:{
            type: Number,
            required: true,
            default:0
        },
        location:{
            type: String,
            required: true,
            default:null
        },
        status: {
            type: Boolean,
            required: true,
            default: true
        }
    },
    { timestamps: true },
)

module.exports = mongoose.model('contacts', User)