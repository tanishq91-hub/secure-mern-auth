import express from "express"
import { verifyCSRFToken } from "../config/csrfMiddleware.js"
import {
    adminController,
    loginUser,
    logoutUser,
    myProfile,
    refreshCSRF,
    refreshToken,
    registerUser,
    verifyOtp,
    verifyUser
} from "../controllers/user.controller.js"
import { authorizedAdmin, isAuth } from "../middlewares/isAuth.js"

const router = express.Router()

router.post("/register", registerUser)
router.post("/verify/:token", verifyUser)
router.post("/login", loginUser)
router.post("/verify", verifyOtp)
router.get("/me", isAuth, myProfile)
router.post("/refresh", refreshToken)
router.post("/logout", isAuth, verifyCSRFToken, logoutUser)
router.post("/refresh-csrf", isAuth, refreshCSRF)
router.get("/admin", isAuth, authorizedAdmin, adminController)

export default router
