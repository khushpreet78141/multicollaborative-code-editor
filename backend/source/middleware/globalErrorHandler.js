const globalErrorHandler = (err,req,res,next)=>{
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error"

    if(err.code === 11000){
        statusCode = 409
        message = "Duplicate resource"
    };

    //log unexpected errors

    if(!err.isOperational){
        console.error("UNEXPECTED ERROR: ",err)
    };

    return res.status(statusCode).json({
        success:false,
        message
    });
   
}

export default globalErrorHandler;