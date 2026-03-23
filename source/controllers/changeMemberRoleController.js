import changeMemberRoleService from "../services/changeMemberRoleService.js";

async function changeMemberRoleController(req,res) {
    const roomId = req.room._id;
   const memberId = req.params.memberId;
    const newrole = req.body.role;

    const result = await changeMemberRoleService(roomId,memberId,newrole);
    return res.status(200).json({
        success:true,
        message:"updated successfully",
        updatedResult:result
    })

}

export default changeMemberRoleController;