import express from "express";
import authController from "../controller/auth.controller";
import protect from "../common/middleware/protect.middleware";

const authRouter = express.Router();

authRouter.post("/register", authController.register)

authRouter.post("/login", authController.login)
authRouter.post("/refresh-token", authController.refreshToken)
authRouter.get("/get-info", protect,authController.getInfo)
authRouter.post("/google-login" ,authController.googleLogin)


export default authRouter
