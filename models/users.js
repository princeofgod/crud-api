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

userSchema.index({'$**' : 'text', '_id' : 'text'});
// userSchema.index({'email' : 'text'})
const User = mongoose.model('User', userSchema);
module.exports = User;