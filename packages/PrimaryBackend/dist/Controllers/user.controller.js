"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUser = exports.SignIn = exports.SignUp = void 0;
const __1 = require("..");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.email || !req.body.password || !req.body.name) {
            return res.status(401).json({ msg: "please provide credentials" });
        }
        const { email, password, name } = req.body;
        const user = yield __1.client.user.findFirst({
            where: {
                email
            }
        });
        if (user) {
            res.status(201).json({ msg: "user already exist please login/signin" });
        }
        const newUser = yield __1.client.user.create({
            data: { email, password, name }
        });
        const token = jsonwebtoken_1.default.sign({ id: newUser.id }, "JWTSCRET");
        res.cookie("JwtCookie", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        }).status(201).json({ msg: "user created", token });
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.SignUp = SignUp;
const SignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(401).json({ msg: "please provide credentials" });
        }
        const { email, password } = req.body;
        const user = yield __1.client.user.findFirst({
            where: {
                email
            }
        });
        if (!user || user.password !== password) {
            res.status(400).json({ msg: "invalid credentials user not found" });
        }
        else {
            const token = jsonwebtoken_1.default.sign({ id: user.id }, "JWTSCRET");
            res.cookie("JwtCookie", token, {
                httpOnly: true,
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            }).status(201).json({ msg: "user Login", token });
        }
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.SignIn = SignIn;
const GetUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        const id = req.id;
        const user = yield __1.client.user.findFirst({
            where: {
                id
            },
            select: {
                name: true,
                email: true,
                id: true
            }
        });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.GetUser = GetUser;
