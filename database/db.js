const mongoose = require('mongoose');
const URI = process.env.URI;


const connectDb = async ()=>{

    try{
        await mongoose.connect(URI);
        console.log('connection established with database');
    }catch(err){
        console.error(err);
        process.exit(0);
    }
}

module.exports = connectDb; 