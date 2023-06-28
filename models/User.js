const mongoose = require('mongoose');
// const validator = require('validator');
// const bcrypt = require('bcrypt');

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


// //Login
// userSchema.statics.signup = async function(email, password) {
//     if(!email || !password){throw Error("All fields are required.")}
//     if(!validator.isEmail(email)){throw Error("Invalid Email.")}
//     if(!validator.isStrongPassword(password)){throw Error("Please choose a strong password.")}

//     const user = await this.findOnde({email});
//     if (user) {throw Error("Email already registered.");}

//     const salt = await bcrypt.genSalt(9);
//     const hashedPassword = await bcrypt.hash(password,salt);

//     const newUser = await this.Create({email, password: hashedPassword});

//     return newUser;
// }

// //Signup
// userSchema.statics.login = async function(email, password) {
//     if(!email || !password){throw Error("All fields are required.")}
    

//     const user = await this.findOnde({email});
//     if (!user) {throw Error("Email not registered.");}

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//         throw Error("Incorrect password");
//     }

//     return User;
// }

module.exports = User;