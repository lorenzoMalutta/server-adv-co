import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
        return res.status(201);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const createUser = async (req: Request, res: Response) => {
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
        const user = await prisma.user.create({
            data: { name, permission, role, email },
        });
        res.json(user);
        return res.status(201);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.delete({ where: { id: Number(id) } });
        res.json(user);
        return res.status(201);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
