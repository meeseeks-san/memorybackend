const mongoose = require("mongoose")
const Schema = mongoose.Schema

const memoryschema = new Schema({
    memoryTitle: {
        type: String,
        require: true
    },
    memoryimageUrl:{
        type: String,
        require: true
    }
})

const Memory = mongoose.model("memory",memoryschema)
module.exports = Memory