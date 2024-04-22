const express = require("express");
const userRouter = require('./routes/users.routes')
const app = express();
const cors = require('cors');
require('./configs/db')


app.use(cors());

  

app.use(express.json());

app.use("/api", userRouter)








app.get("/", (req, res)=>{
    res.send("This is the homepage")
})

app.use((req, res)=>{
    res.send("There is no such route, please make use of sense")
})

module.exports = app;