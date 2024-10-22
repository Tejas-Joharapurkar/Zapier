import express from "express"
import { PrismaClient } from "../../../node_modules/@prisma/client"
import { utilsRouter } from "./Routes/utlis.route"
import { userRouter } from "./Routes/user.route"
import { zapRouter } from "./Routes/zap.router"

export const client = new PrismaClient()
const app = express()
app.use(express.json())
app.use("/api/v1/utils", utilsRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/zap", zapRouter)
app.listen(8001, () => {
    console.log("main server on 8001");
})

/**
//  * todo register user
//  * todo login user
//  * todo trigger list
//  * todo action list
 * todo create zap
 * todo send zapRun status
 * todo send a specific zap
//  * todo add new actions to DB Admin only
//  * todo add new triggers to DB ADmin only
 */