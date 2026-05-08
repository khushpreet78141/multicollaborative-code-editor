import contactUsService from "../services/contactUsService.js";

export default async function contactUsController(req,res){
    const {name,email,data} = req.body
    if(!name || !email || !data){
        return res.status(400).json({
            success:false,
            message:"Invalid Data Sent"
        })
    }

    const result = await contactUsService(name,email,data);
    res.status(200).json({
        success:true,
        data:result
    });

}