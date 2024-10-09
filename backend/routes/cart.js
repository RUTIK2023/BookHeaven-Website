const express=require('express');
const router=express.Router();
const {authenticateToken}=require('./userAuth');
const User=require('../models/user'); 
 

// add to cart
router.put('/add-to-cart',authenticateToken,async(req,res)=>{

    try{

        const{bookid,id}=req.headers;
        const user=await User.findById(id);

        const isBookinCart=user.cart.includes(bookid);
        if(isBookinCart){
            return res.status(200).json({
                message:"book already in cart!",
            })
        }

        await User.findByIdAndUpdate(id,{$push:{cart:bookid}});
        return res.status(200).json({
            status:"sUCCESS",
            message:"Book added in cart!",
        })

    }catch(error){
        return res.status(500).json({
            message:"Error adding book to cart!",
        })
    }
});



router.put('/remove-from-cart/:bookid',authenticateToken,async(req,res)=>{

    try{

        const{id}=req.headers;
        const {bookid}=req.params;
        const user=await User.findById(id);

        
        
        await User.findByIdAndUpdate(id,{$pull:{cart:bookid}});
        
        

        return res.status(200).json({
            status:"Success",
            message:"Book removed from cart!",
        })

    }catch(error){
        return res.status(500).json({
            message:"Error loading book!",
        })
    }
});

// get fav books
router.get('/get-user-cart',authenticateToken,async(req,res)=>{

    try{

        const{id}=req.headers;
        const userData=await User.findById(id).populate("cart");

        const cart=userData.cart.reverse();

        return res.status(200).json({
            // message:"Book removed from favourites!",
            status:"Success",
            data:cart,
        })

    }catch(error){
        return res.status(500).json({
            message:"Error cart!",
           
        })
    }
});


module.exports=router;