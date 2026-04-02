import loginService from "../services/loginService.js";

export default async function loginController(req,res){
    const email = req.body.email
    const password = req.body.password
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"not able to login!"
        })
    }


    const token = await loginService(email,password);

    res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        sameSite:"Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.status(200).json({
        success:true,
        message:"login successfully",
        
    })
}