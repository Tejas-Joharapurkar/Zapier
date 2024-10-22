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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillZap = exports.CreateZap = void 0;
const __1 = require("..");
const CreateZap = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    try {
        const newZap = yield __1.client.zap.create({
            data: {
                userId
            }
        });
        res.status(201).json({ msg: "zap created", zapId: newZap.id });
    }
    catch (error) {
        res.status(400).json({ msg: "error in createzap", error });
    }
});
exports.CreateZap = CreateZap;
const fillZap = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { selectedTriggerId, actions, zapId } = req.body;
        /**
         * * Create the Actual trigger and actions in Trigger and Action table
         * * while creating them insert zapID
        */
        const activateTrigger = yield __1.client.trigger.create({
            data: {
                triggerId: selectedTriggerId, zapId: zapId
            }
        });
        const activateActions = yield __1.client.action.createMany({
            data: actions.map((action, index) => {
                return { actionId: action, zapId: zapId, sortingID: index };
            })
        });
        res.status(201).json({ msg: "trigger and action added to zap" });
    }
    catch (error) {
        res.status(400).json({ msg: "error in fillZap", error });
    }
});
exports.fillZap = fillZap;
