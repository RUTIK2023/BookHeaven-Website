const mongoose=require('mongoose');
require("dotenv").config();

const dbConnect = ()=>{
    mongoose.connect(process.env.MONGO_URL).then(console.log("connected to db.."))
    .catch((e)=>{
        console.log("error detected ",e);
        process.exit(1);
    })
}

module.exports=dbConnect;
