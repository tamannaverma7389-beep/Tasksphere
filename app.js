const express = require("express");
require('dotenv').config();
const cookieParser = require("cookie-parser")


const {connectMongoDb} = require('./db');
const userRouter = require('./routes/user');        


const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cookieParser());

connectMongoDb();
console.log("test", process.env.MONGO_URL);



app.use("/user", userRouter);


app.listen(PORT, () => console.log(`server started at PORT:${PORT}`));