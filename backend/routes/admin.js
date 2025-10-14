import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const router = express.Router();

router.get('/users', async(req, res) => {
    const allUsers = await prisma.usuario.findMany()
    res.status(200).json(allUsers);
})

router.put('/user', async(req, res) => {

    const { id, role, name, email, password, tasksList, profilePicture } = req.body;

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    
    await prisma.usuario.update({
        where: {
            id
        },
        data: {
            role,
            name,
            email,
            password: hashPassword,
            tasksList,
            profilePicture 
        }
    });
    
    res.status(200).json("Usuário atualizado");
})

router.delete('/user', async(req, res) => {
    await prisma.usuario.delete({
        where: {
            id: req.body.id
        }
    });
    res.status(200).json("Usuário deletado");
})

export default router;