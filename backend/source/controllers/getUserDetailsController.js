import getUserDetailsService from '../services/getUserDetailsService.js'

export default async function getUserDetailsController(req,res){
    const userId = req.params.userId
    const userDetails = await getUserDetailsService(userId);
    
    res.status(200).json({
        success:true,
        data:userDetails
    });
    
}