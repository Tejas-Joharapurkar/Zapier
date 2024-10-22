import { client } from "..";
import { Request, Response } from "express"
import jwt from "jsonwebtoken"

export const SignUp = async (req: Request, res: Response) => {
    try {
        if (!req.body.email || !req.body.password || !req.body.name) {
            return res.status(401).json({ msg: "please provide credentials" });
        }
        const { email, password, name }: { email: string, password: string, name: string } = req.body
        const user = await client.user.findFirst({
            where: {
                email
            }
        })
        if (user) {
            res.status(201).json({ msg: "user already exist please login/signin" })
        }
        const newUser = await client.user.create({
            data: { email, password, name }
        })
        const token = jwt.sign({ id: newUser.id }, "JWTSCRET")
        res.cookie("JwtCookie", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        }).status(201).json({ msg: "user created", token });

    } catch (error) {
        res.status(400).send(error)
    }
}

export const SignIn = async (req: Request, res: Response) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(401).json({ msg: "please provide credentials" });
        }
        const { email, password }: { email: string, password: string } = req.body
        const user = await client.user.findFirst({
            where: {
                email
            }
        })
        if (!user || user.password !== password) {
            res.status(400).json({ msg: "invalid credentials user not found" })
        } else {
            const token = jwt.sign({ id: user.id }, "JWTSCRET")
            res.cookie("JwtCookie", token, {
                httpOnly: true,
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            }).status(201).json({ msg: "user Login", token })
        }
    } catch (error) {
        res.status(400).send(error)
    }
}

export const GetUser = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const id: number = req.id
        const user = await client.user.findFirst({
            where: {
                id
            },
            select: {
                name: true,
                email: true,
                id: true
            }
        })

        res.status(201).json(user)

    } catch (error) {
        res.status(400).send(error)
    }

}