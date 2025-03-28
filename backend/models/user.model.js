const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const userSchema = new Schema({
    user_Name: {
        type: String,
        required: [true, "please enter user full name"],
    },
    user_Email: {
        type: String,
        required: [true, "please enter email"],
    },
    
    mobile_no:{
        type: String,
        required: [true, "please enter mobile_no"],
    },
    password: {
        type: String,
        required: [true, "please enter password"]
    },

    user_type: {
        type: String,
        required: [true, "please select usertype"]
    },
    

    isActive: {
        type: Boolean,
        default: true
    },

    deleteFlag: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})
module.exports = mongoose.model("User", userSchema)

