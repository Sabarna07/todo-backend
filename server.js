const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require("cookie-parser");
const morgan = require('morgan')
require('dotenv').config()

// app
const app = express();

app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({
    origin : "http://ec2-65-0-110-57.ap-south-1.compute.amazonaws.com"
}));

//cors
//if (process.env.NODE_ENV === "development") {
//    app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
//  }

// bring routes
const behaviourRoute = require('./routes/behaviour')
const behaviourToDoRoute = require('./routes/behaviourTodo')
const authRoute = require('./routes/auth');
const { authJWT } = require('./controller/auth');

// db connection
mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('DB Connected'))
  
  mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
  });


// use routes
app.use('/api', behaviourRoute)
app.use('/api', behaviourToDoRoute)
app.use('/api', authRoute)

// server listen
app.listen(8000 || process.env.PORT,()=>{
    console.log(`Server running at port ${process.env.PORT}`)
})
