import Room from '../../models/roomSchema.js';
import RoomMember from '../../models/roomMemberSchema.js';
const requireMember = async (req, res, next) => {
    try {
        const roomId = req.params.roomId;
        const userId = req.user.userId;
        const room = await Room.findById(roomId);

        if (!roomId) {
            return res.status(400).json({
                success: false,
                message: "roomId is required"
            })
        }
        //check owner
        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            })
        }
        if (room.owner.toString() === userId.toString()) {
            req.roomRole = "owner"
            req.room = room
            return next()
        }

        //check membership
        const membership = await RoomMember.findOne({ roomId, memberId: userId })
        if (!membership) {
            return res.status(403).json({
                success: false,
                message: "Access denied: not a member of this room"
            })
        }
        req.roomMember = membership;
        req.roomRole = membership.role;
        req.room = room
        return next();

    } catch (err) {

        return next(err);
        
    }

}
export default requireMember;