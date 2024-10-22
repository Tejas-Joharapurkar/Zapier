"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("../../../node_modules/@prisma/client");
const utlis_route_1 = require("./Routes/utlis.route");
const user_route_1 = require("./Routes/user.route");
const zap_router_1 = require("./Routes/zap.router");
exports.client = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1/utils", utlis_route_1.utilsRouter);
app.use("/api/v1/user", user_route_1.userRouter);
app.use("/api/v1/zap", zap_router_1.zapRouter);
app.listen(8001, () => {
    console.log("main server on 8001");
});
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
