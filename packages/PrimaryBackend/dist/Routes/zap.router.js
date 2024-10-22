"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zapRouter = void 0;
const express_1 = require("express");
const zapFunctions_controllers_1 = require("../Controllers/zapFunctions.controllers");
const router = (0, express_1.Router)();
router.route("/createzap").post(zapFunctions_controllers_1.CreateZap);
router.route("/fillzap").post(zapFunctions_controllers_1.fillZap);
exports.zapRouter = router;
