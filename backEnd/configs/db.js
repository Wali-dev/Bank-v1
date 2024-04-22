const dev = require("./config");
const mongoose = require('mongoose');

const URL = dev.url.db_url;


mongoose.connect(URL)
.then(()=>{
    console.log("DB is connected")
})

.catch((err)=>{
    console.log(err.message)
})