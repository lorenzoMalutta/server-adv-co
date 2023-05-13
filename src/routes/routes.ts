import express from 'express';
import { createUser, deleteUser, getUsers } from '../http/controller/controller';

const router = express.Router();

router.get('/users', getUsers);
router.post('/users', createUser);
router.delete('/users/:id', deleteUser);

export default router;
