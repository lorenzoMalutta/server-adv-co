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
exports.deleteUser = exports.createUser = exports.getUsers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany();
        res.json(users);
        return res.status(201);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getUsers = getUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, permission, role, email } = req.body;
    if (!name || !permission || !role || !email) {
        return res.status(400).json({ error: 'Please fill all fields' + name + permission + role + email });
    }
    if (!email.includes('@')) {
        return res.status(400).json({ error: 'Please enter a valid email' });
    }
    if (permission !== 'administrador' && permission !== 'visualizador') {
        return res.status(400).json({ error: 'Please enter a valid permission' });
    }
    try {
        const user = yield prisma.user.create({
            data: { name, permission, role, email },
        });
        res.json(user);
        return res.status(201);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.createUser = createUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield prisma.user.delete({ where: { id: Number(id) } });
        res.json(user);
        return res.status(201);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=controller.js.map