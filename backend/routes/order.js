const express=require('express');
const router=express.Router();
const {authenticateToken}=require('./userAuth');
const User=require('../models/user'); 
const Book=require("../models/book");
const Order=require("../models/order");
const user = require('../models/user');


// place-order
router.post("/place-order",authenticateToken,async(req,res)=>{

    try{

        const{id}=req.headers;
        const{order}=req.body;
        // const orderIds = [];

        // for each order placed
        for(const orderData of order){

            const newOrder=new Order({user:id,book:orderData._id});
            const orderFromDB=await newOrder.save();

            // saving order in user model
            await User.findByIdAndUpdate(id,{$push:{orders:orderFromDB._id}});

            // clearing cart
            // Collect the book IDs to remove from cart later
            await User.findByIdAndUpdate(id,{$pull:{cart:orderData._id}});
            // orderIds.push(orderData._id);
            

        }

        

        return res.status(200).json({
            status:"Success",
            message:"Orders placed successfully",
        });


    }catch(error){

        return res.status(500).json({
            message:"Internal server error",
        })
    }


});


// get ordr history for particular user..

router.get("/get-order-history",authenticateToken,async(req,res)=>{

    try{

        const{id}=req.headers;

        const userData= await User.findById(id).populate({
            path:"orders",
            populate:{path:"book"},
        });

        const orderData=userData.orders.reverse();

       

        return res.status(200).json({
            status:"Success",
            data:orderData
        });


    }catch(error){
        console.log(error);

        return res.status(500).json({
            message:"Internal server error",
        })
    }


});


// router.get("/get-order-history", authenticateToken, async (req, res) => {
//     try {
//         const { id } = req.headers;

//         // Fetch user data along with orders and associated books
//         const userData = await User.findById(id).populate({
//             path: "orders",
//             populate: {
//                 path: "book",
//                 model: "Book",
//                 select: "title author",  // Optionally select only relevant fields
//             }
//         });

//         // Check if user exists
//         if (!userData) {
//             return res.status(404).json({
//                 status: "Fail",
//                 message: "User not found",
//             });
//         }

//         // Handle empty orders
//         const orderData = userData.orders && userData.orders.length > 0 
//             ? userData.orders.reverse() 
//             : [];

//         return res.status(200).json({
//             status: "Success",
//             data: orderData,
//         });

//     } catch (error) {
//         console.error("Error fetching order history:", error.message);  // Log error
//         return res.status(500).json({
//             message: "Internal server error",
//             error: error.message,  // Optional for debugging
//         });
//     }
// });



// get all orders for admin view
router.get("/get-all-orders",authenticateToken,async(req,res)=>{

    try{
        const userData= await Order.find()
        .populate({
            path:"book",
        })
        .populate({
            path:"user",
        })
        .sort({createdAt:-1});

        return res.status(200).json({
            status:"Success",
            data:userData
        });


    }catch(error){

        return res.status(500).json({
            message:"Internal server error",
        })
    }


});


// 
router.put("/update-status/:id",authenticateToken,async(req,res)=>{

    try{

        const {id}=req.params;

        await Order.findByIdAndUpdate(id,{status:req.body.status});
        

        return res.status(200).json({
            status:"Success",
            message:"Status upadted successfully!" 
        });


    }catch(error){

        return res.status(500).json({
            message:"Internal server error",
        })
    }


});










module.exports=router;