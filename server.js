const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const postRoutes = require('./routes/postRoute');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);

// Connecting to DB and starting the server
const PORT = process.env.PORT;

const connectDb = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected.');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}.`);
    });
  })
  .catch((err) => console.log(err));
