import express from "express"
import { PrismaClient } from "../../../node_modules/@prisma/client"

const client = new PrismaClient()
const app = express()

// app.use(express.json())

app.post("/hooks/:zapId/:userId", async (req, res) => {
    const { zapId, userId } = req.params
    const { metaData } = req.body
    try {
        client.$transaction(async (tx) => {
            const zaprun = await tx.zapRun.create({
                data: {
                    zapId: zapId,
                    metaData
                }
            })

            const outbox = await tx.zapRunOutbox.create({
                data: {
                    zapRunId: zaprun.id
                }
            })
        })
        res.status(201).send(`zap outboxed`)
    } catch (error) {
        res.status(400).send("error")
    }
})


app.listen(8000, () => {
    console.log("hooks server on 8000");
})