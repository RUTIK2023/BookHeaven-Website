const express=require('express');
const app=express();
const cors=require('cors');
require("dotenv").config();

// routes
const userRoutes=require('./routes/user');
const bookRoutes=require('./routes/book');
const favouriteRoutes=require('./routes/favourites');
const cartRoutes=require('./routes/cart');
const orderRoutes=require('./routes/order');

app.use(express.json());
app.use(cors());

app.use("/api/v1",userRoutes);
app.use("/api/v1",bookRoutes);
app.use("/api/v1",favouriteRoutes);
app.use("/api/v1",cartRoutes);
app.use("/api/v1",orderRoutes);


const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`server run on ${PORT}`);
})

const dbConnect=require('./config/db');
dbConnect();