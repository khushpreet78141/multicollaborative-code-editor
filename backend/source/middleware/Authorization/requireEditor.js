const requireEditor = (req,res,next)=>{

    try{
         const role = req.roomRole?.toLowerCase();

    if(!role){
        return res.status(401).json({

            success:false,
            message:"room authorization missing"

        })
    }
    if( role!=="editor" && role!=="owner" ){
        return res.status(403).json({
            success:false,
            message:" user cannot edit"
        })
    }
    next()
    }catch(err){
        console.error(err)
        return res.status(400).json({
            success:false,
            message:"Authorization middleware failure ! "
        })
    }

}

export default requireEditor;