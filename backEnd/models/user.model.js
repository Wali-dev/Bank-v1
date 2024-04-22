const mongoose = require('mongoose');


const userSchema = mongoose.Schema({

    id:{
        type: String,
        required : true
    },
    name:{
        type: String,
        required : true
    }, 
    email:{
        type: String,
        required : true
    },
    userID:{
        type: String,
        required : true
    },
    age:{
        type: Number,
        required: true
        
    },
    items:{
        type: [String]
    },
    ocupation:{
        type: String,
        required : true
    },
    userCreated:{
        type: Date,
        default: Date.now
    },

    currentBalance:{
        type: Number,
        required : true
    },

    lastTransaction:{
        type: Number,
    },
    
})

module.exports = mongoose.model("Users", userSchema);