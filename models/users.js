const mongoose =require('mongoose');

const userSchema = new mongoose.Schema({
    firstname : {
        type : String,
    },
    lastname : {
        type : String,
    },
    email : {
        type : String,
    },
    gender : {
        type : String
    },
    phone : {
        type : Number,
    }, 
})

const User = mongoose.model('User', userSchema);
module.exports = User;