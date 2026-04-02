import jwt from "jsonwebtoken"
const auth = (req,res,next)=>{
    try{
        const token = req.cookies.token;
        
        if(!token){
            return res.status(401).json({
                success:false,
                message:"NO token available!"
            })
        }
     
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY); 
    req.user = {userId : decoded.userId};
    next();
  
    }catch(err){

        console.error(err);
        
        return res.status(401).json({
            success:false,
            message:"authorization failed!"
        });
    }
};

export default auth;