import { Router } from "express";
import { fillZap, CreateZap } from "../Controllers/zapFunctions.controllers";
const router = Router()

router.route("/createzap").post(CreateZap)
router.route("/fillzap").post(fillZap)

export const zapRouter = router