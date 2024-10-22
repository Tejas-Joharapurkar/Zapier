import { Router } from "express";
import { CreateAvailableAction, CreateAvailableTigger, getAllAvalilabeActions, getAllAvalilabeTriggers } from "../Controllers/utils.controller";
const router = Router()

router.route("/createtrigger").post(CreateAvailableTigger)
router.route("/createaction").post(CreateAvailableAction)
router.route("/getallavailabetriggers").get(getAllAvalilabeTriggers)
router.route("/getallavailabeactions").get(getAllAvalilabeActions)

export const utilsRouter = router