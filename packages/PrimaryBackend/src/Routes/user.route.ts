import { Router } from "express";
import { SignIn, SignUp, GetUser } from "../Controllers/user.controller";
import { Authenticate } from "../Middlewares/auth";
const router = Router()

router.route("/").get(Authenticate, GetUser)
router.route("/signup").post(SignUp)
router.route("/signin").post(SignIn)

export const userRouter = router