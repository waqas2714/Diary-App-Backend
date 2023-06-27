const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
},{
    timeStamps : true
})

const User = mongoose.model("users", userSchema);

export default User