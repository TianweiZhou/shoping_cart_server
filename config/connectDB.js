const mongoose = require('mongoose');
const config = require('config');
const dbcon = config.get('mongoDBConnectURI');

const connectDB = async () => {
    try{
        await mongoose.connect(dbcon, { useNewUrlParser:true, useUnifiedTopology:true});
        console.log('Database connected');
    }catch(err){
        console.log('Unable to connect, ' + err.message());
        process.exit();
    }
}
module.exports = connectDB;