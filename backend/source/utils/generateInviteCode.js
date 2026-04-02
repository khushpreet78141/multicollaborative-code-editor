import crypto from "crypto";


export default function generateInviteCode() {
    return crypto.randomUUID().slice(0, 8);;
};

