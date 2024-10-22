import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export const Authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization as unknown as string
        const decode = jwt.verify(token, "JWTSCRET")
        // @ts-ignore
        req.id = decode.id
        next()
    } catch (error) {
        res.status(403).json({ msg: "unauthorized to view" })
    }
}