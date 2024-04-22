const app = require('./app');
const dev = require('./configs/config')
const PORT = dev.port.port_no;



app.listen(PORT, ()=>{
    console.log(`The server is running on http://localhost:${PORT}`)

})