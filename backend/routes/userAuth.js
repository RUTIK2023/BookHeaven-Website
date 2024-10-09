const jwt=require('jsonwebtoken');
require("dotenv").config();

const authenticateToken=(req,res,next)=>{

    const authHeader=req.headers["authorization"];
    const token=authHeader && authHeader.split(" ")[1];

    // if not token
    if(token==null){
        return res.status(401).json({
            message:"Authenticaton token required",
            
        })
    }

    //verify token
    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
        if(err){
            return res.status(403).json({
                message:" token expired",
                
            })
        }

        req.user=user;
        next();
    });

};

module.exports={authenticateToken};