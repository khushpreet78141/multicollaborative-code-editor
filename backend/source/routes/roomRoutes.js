import { Router } from "express";
import getAllMembersOwnedController from "../controllers/getAllMembersOwnedController.js";
import auth from "../middleware/authMiddleware.js";
import requireOwner from "../middleware/Authorization/requireOwner.js";
import requireMember from "../middleware/Authorization/requireMember.js";

import createRoomController from "../controllers/createRoomController.js";
import deleteRoomController from "../controllers/deleteRoomController.js";
import updateRoomDetailsController from "../controllers/updateRoomDetailsController.js";
import getRoomDetailsController from "../controllers/getRoomDetailsController.js";

import createRoomMemberController from "../controllers/createRoomMemberController.js";
import getRoomMemberController from "../controllers/getRoomMemberController.js";
import listingRoomUserController from "../controllers/listingRoomUserController.js";
import removeRoomMemberController from "../controllers/removeRoomMemberController.js";
import changeMemberRoleController from "../controllers/changeMemberRoleController.js";

import leaveRoomController from "../controllers/leaveRoomController.js";
import publicRoomController from "../controllers/publicRoomController.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();

/* ROOM ROUTES */

// create room
router.post("/", auth, asyncHandler(createRoomController));

// get room details
router.get("/roomDetails/:roomId", auth, requireMember, asyncHandler(getRoomDetailsController));

// update room details
router.put("/updateRoomDetails/:roomId", auth, requireMember,requireOwner, asyncHandler(updateRoomDetailsController));

// delete room
router.delete("/deleteRoom/:roomId", auth, requireMember,requireOwner, asyncHandler(deleteRoomController));


/* ROOM MEMBER ROUTES */

// add member
router.post("/addMember", auth, asyncHandler(createRoomMemberController));

// list all members in room
router.get("/listMembers/:roomId/members", auth, requireMember, asyncHandler(getRoomMemberController));

//// get single member info
//router.get("/memberInfo/:roomId/members/:memberId", auth, requireMember, getRoomMemberController);

// remove member
router.delete("/removeMember/:roomId/members/:memberId", auth,requireMember, requireOwner, asyncHandler(removeRoomMemberController));

// change member role
router.put("/:roomId/members/:memberId/role", auth,requireMember, requireOwner, asyncHandler(changeMemberRoleController));


//list all rooms where a user is a member
router.get("/listRooms",auth,asyncHandler(listingRoomUserController));

// listing members of a room where user is a owner
router.get("/ownerRoom/listAllMembers/:roomId",auth,requireMember,requireOwner,asyncHandler(getAllMembersOwnedController));


// leave room
router.delete("/:roomId/leave", auth, requireMember, asyncHandler(leaveRoomController));

//public room
router.get("/publicRoom",auth,asyncHandler(publicRoomController));

export default router;

