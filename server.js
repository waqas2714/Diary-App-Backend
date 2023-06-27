const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const postRoutes = require('./routes/postRoute');
const app = express();

//Middlewares
app.use(express.urlencoded({extended : true}));
app.use("/api/posts",postRoutes);

// Connecting do DB and Server
const PORT = process.env.PORT;
const connectDb = async ()=>{
    try {
        mongoose.set("strictQuery", true);
        mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser : true,
            useUnifiedTopology: true
        });
        console.log("MongoDB Connected.")
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

connectDb().then(
    app.listen(PORT, ()=>{
        console.log(`listening on port ${PORT}.`);
    })
).catch(
    err => console.log(err)
)


