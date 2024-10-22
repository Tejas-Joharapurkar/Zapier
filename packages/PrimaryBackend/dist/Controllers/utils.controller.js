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
exports.getAllAvalilabeActions = exports.getAllAvalilabeTriggers = exports.CreateAvailableAction = exports.CreateAvailableTigger = void 0;
const __1 = require("..");
const CreateAvailableTigger = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const availableTriggers = yield __1.client.availableTriggers.create({
            data: { name }
        });
        res.status(201).json({ msg: "trigger created", availableTriggers });
    }
    catch (error) {
        res.status(401).json({ msg: "error in availabletrigger created" });
    }
});
exports.CreateAvailableTigger = CreateAvailableTigger;
const CreateAvailableAction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const availableActions = yield __1.client.availableActions.create({
            data: { name }
        });
        res.status(201).json({ msg: "trigger created", availableActions });
    }
    catch (error) {
        res.status(401).json({ msg: "error in availabletrigger created" });
    }
});
exports.CreateAvailableAction = CreateAvailableAction;
const getAllAvalilabeTriggers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AllAvalilabeTriggers = yield __1.client.availableTriggers.findMany();
        res.status(201).json({ msg: "fetched all Triggers", AllAvalilabeTriggers });
    }
    catch (error) {
        res.status(401).json({ msg: "somting went wrong in getAllAvalilabeTriggers" });
    }
});
exports.getAllAvalilabeTriggers = getAllAvalilabeTriggers;
const getAllAvalilabeActions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AllAvalilabeActions = yield __1.client.availableActions.findMany();
        res.status(201).json({ msg: "fetched allActions", AllAvalilabeActions });
    }
    catch (error) {
        res.status(401).json({ msg: "somting went wrong in getAllAvalilabeActions" });
    }
});
exports.getAllAvalilabeActions = getAllAvalilabeActions;
