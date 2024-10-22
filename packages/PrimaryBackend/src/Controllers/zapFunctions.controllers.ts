import { client } from "..";
import { Request, Response } from "express";

export const CreateZap = async (req: Request, res: Response) => {
    const { userId }: { userId: number } = req.body
    try {
        const newZap = await client.zap.create({
            data: {
                userId
            }
        })

        res.status(201).json({ msg: "zap created", zapId: newZap.id })
    } catch (error) {
        res.status(400).json({ msg: "error in createzap", error })
    }
}
export const fillZap = async (req: Request, res: Response) => {

    try {
        const { selectedTriggerId, actions, zapId }: { selectedTriggerId: string, actions: string[], zapId: string } = req.body
        /** 
         * * Create the Actual trigger and actions in Trigger and Action table
         * * while creating them insert zapID 
        */

        const activateTrigger = await client.trigger.create({
            data: {
                triggerId: selectedTriggerId, zapId: zapId
            }
        })
        const activateActions = await client.action.createMany({
            data: actions.map((action, index) => {
                return { actionId: action, zapId: zapId, sortingID: index }
            })
        })
        res.status(201).json({ msg: "trigger and action added to zap" })
    } catch (error) {
        res.status(400).json({ msg: "error in fillZap", error })
    }
}