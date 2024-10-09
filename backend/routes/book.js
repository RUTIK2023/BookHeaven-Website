const express=require('express');
const router=express.Router();
require("dotenv").config();
const {authenticateToken}=require('./userAuth');
const User=require('../models/user');  
const Book=require('../models/book');
// const { route } = require('./user');


// add-book by only admin
router.post('/add-book',authenticateToken,async(req,res)=>{
    try{

        const {id}=req.headers;
        const user=await User.findById(id);
        if(user.role !== "admin"){
            return res.status(400).json({
                message:"Only Admin can access!",
            })
        }
        //book obj
        const book=new Book({
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language,
        });
        await book.save();
        res.status(200).json({
            message:"Book created successfully!",
        })

    }catch(error){
        res.status(500).json({
            message:"Error while creating book!",
        })
    }
});

// update-book
router.put('/update-book',authenticateToken,async(req,res)=>{
    try{

        const {bookid}=req.headers;
        
        //book obj
        await Book.findByIdAndUpdate(bookid,{
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language,
        });
        
        return res.status(200).json({
            message:"Book updated successfully!",
        })

    }catch(error){
        return res.status(500).json({
            message:"Error while updating book!",
        })
    }
});


// delete book..
router.delete('/delete-book',authenticateToken,async(req,res)=>{
    try{

        const {bookid}=req.headers;
        
        //book obj
        await Book.findByIdAndDelete(bookid);
          
        return res.status(200).json({
            message:"Book deleted successfully!",
        })

    }catch(error){
        return res.status(500).json({
            message:"Error while deleting book!",
        })
    }
});


// get all books

router.get('/get-all-books',async(req,res)=>{
    try{

        const books=await Book.find().sort({createdAt:-1});
        
          
        return res.status(200).json({
            message:"Books get successfully!",
            status:"Success",
            data:books,
        })

    }catch(error){
        return res.status(500).json({
            message:"Error loading book!",
        })
    }
});

// most recent books visited..
router.get('/get-recent-books',async(req,res)=>{
    try{

        const books=await Book.find().sort({createdAt:-1}).limit(4);
        
          
        return res.status(200).json({
            // message:"Books get successfully!",
            status:"Success",
            data:books,
        })

    }catch(error){
        return res.status(500).json({
            message:"Error loading book!",
        })
    }
});


// get particular book
router.get('/get-book-by-id/:id',async(req,res)=>{
    try{

        const{id}=req.params;
        const book=await Book.findById(id);
        
          
        return res.status(200).json({
            // message:"Books get successfully!",
            status:"Success",
            data:book,
        })

    }catch(error){
        return res.status(500).json({
            message:"Error loading book!",
        })
    }
});








module.exports=router;