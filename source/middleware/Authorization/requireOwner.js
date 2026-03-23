const requireOwner = (req,res,next)=>{
    try{
    const role = req.roomRole?.toLowerCase();
    if(!role){
        return res.status(401).json({
            success:false,
            message:"room authorization missing"
        })
    }
    if(role!=="owner"){
        return res.status(403).json({
            success:false,
            message:"user is not owner"
        })
    }
    next() 
}
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Authorization middleware failure"
        })
    }
}


export default requireOwner;

