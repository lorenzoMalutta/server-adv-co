"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const router = express_1.default.Router();
router.post('/users', controller_1.createUser);
router.delete('/users/:id', controller_1.deleteUser);
exports.default = router;
//# sourceMappingURL=routes.js.map