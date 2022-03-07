const mongoose = require('mongoose')
const joi = require('joi')

const eventSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})
let Event = mongoose.model('Event',eventSchema);
module.exports ={Event}

