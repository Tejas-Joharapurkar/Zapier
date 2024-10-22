import { client } from "..";
import { Request, Response } from "express";

export const CreateAvailableTigger = async (req: Request, res: Response) => {
    const { name }: { name: string } = req.body
    try {
        const availableTriggers = await client.availableTriggers.create({
            data: { name }
        })
        res.status(201).json({ msg: "trigger created", availableTriggers })
    } catch (error) {
        res.status(401).json({ msg: "error in availabletrigger created" })
    }
}
export const CreateAvailableAction = async (req: Request, res: Response) => {
    const { name }: { name: string } = req.body
    try {
        const availableActions = await client.availableActions.create({
            data: { name }
        })
        res.status(201).json({ msg: "trigger created", availableActions })
    } catch (error) {
        res.status(401).json({ msg: "error in availabletrigger created" })
    }
}

export const getAllAvalilabeTriggers = async (req: Request, res: Response) => {

    try {
        const AllAvalilabeTriggers = await client.availableTriggers.findMany()
        res.status(201).json({ msg: "fetched all Triggers", AllAvalilabeTriggers })
    } catch (error) {
        res.status(401).json({ msg: "somting went wrong in getAllAvalilabeTriggers" })
    }
}
export const getAllAvalilabeActions = async (req: Request, res: Response) => {

    try {
        const AllAvalilabeActions = await client.availableActions.findMany()
        res.status(201).json({ msg: "fetched allActions", AllAvalilabeActions })
    } catch (error) {
        res.status(401).json({ msg: "somting went wrong in getAllAvalilabeActions" })
    }
}