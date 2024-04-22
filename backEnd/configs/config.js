require('dotenv').config();

const dev = {
    port:{
        port_no: process.env.port
    },
    url:{
        db_url: process.env.db_url
    }
}

module.exports = dev;
