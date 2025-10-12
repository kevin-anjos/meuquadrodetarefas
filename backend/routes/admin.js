import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const router = express.Router();

router.get('/users', async(req, res) => {
    const allUsers = await prisma.usuario.findMany()
    res.status(200).json(allUsers);
})

router.put('/user', async(req, res) => {

    const { id, role, name, email, password, tasksList, profilePicture } = req.body;

    
    await prisma.usuario.update({
        where: {
            id
        },
        data: {
            role,
            name,
            email,
            password,
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