const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    date : {
        type : Date,
        required : true,
        default : Date.now
    },
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps:true
})

const Post = mongoose.model("posts", postSchema);

module.exports = Post