import registerService from "../services/registerService.js"

export default async function registerController(req, res) {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Not able to register !"
        })
    }
    const token = await registerService(username, email, password)

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,        // true in production (HTTPS)
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
        success: true,
        message: "register successfully",
        token

    })

}