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
const express_1 = __importDefault(require("express"));
const client_1 = require("../../../node_modules/@prisma/client");
const client = new client_1.PrismaClient();
const app = (0, express_1.default)();
// app.use(express.json())
app.post("/hooks/:zapId/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { zapId, userId } = req.params;
    try {
        client.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            const zaprun = yield tx.zapRun.create({
                data: {
                    zapId: zapId
                }
            });
            const outbox = yield tx.zapRunOutbox.create({
                data: {
                    zapRunId: zaprun.id
                }
            });
        }));
        res.status(201).send(`zap outboxed`);
    }
    catch (error) {
        res.status(400).send("error");
    }
}));
app.listen(8000, () => {
    console.log("hooks server on 8000");
});
