const express=require('express');
const router=express.Router();
const {authenticateToken}=require('./userAuth');
const User=require('../models/user');

router.put('/add-book-to-favourites',authenticateToken,async(req,res)=>{

    try{

        const{bookid,id}=req.headers;
        const user=await User.findById(id);

        const isBookFav=user.favourites.includes(bookid);
        if(isBookFav){
            return res.status(200).json({
                message:"book already in favourites!",
            })
        }

        await User.findByIdAndUpdate(id,{$push:{favourites:bookid}});
        return res.status(200).json({
            message:"Book added in favourites!",
        })

    }catch(error){
        return res.status(500).json({
            message:"Error adding book!",
        })
    }
});

// remove form fav
router.put('/remove-book-from-favourites',authenticateToken,async(req,res)=>{

    try{

        const{bookid,id}=req.headers;
        const user=await User.findById(id);

        const isBookFav=user.favourites.includes(bookid);
        if(isBookFav){
        
            await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}})
        
        }

        return res.status(200).json({
            message:"Book removed from favourites!",
        })

    }catch(error){
        return res.status(500).json({
            message:"Error adding book!",
        })
    }
});


// get fav books
router.get('/get-favourites-books',authenticateToken,async(req,res)=>{

    try{

        const{id}=req.headers;
        const userData=await User.findById(id).populate("favourites");

        const favBooks=userData.favourites;

        return res.status(200).json({
            // message:"Book removed from favourites!",
            status:"Success",
            data:favBooks,
        })

    }catch(error){
        return res.status(500).json({
            message:"Error loading book!",
           
        })
    }
});





module.exports=router;