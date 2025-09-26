import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();

const prisma = new PrismaClient();

//Pegar a lista de tarefas atual no banco de dados
router.get('/tasks', async(req, res) => {
    const userID = req.userID;

    const user = await prisma.usuario.findUnique({
        where: {
            id: userID
        }
    });

    res.status(200).json(user.tasksList);
});

//Pegar o nome de usuário atual no banco de dados
router.get('/users', async(req, res) => {

    const userID = req.userID;

    const user = await prisma.usuario.findUnique({
        where: {
            id: userID
        }
    });

    res.status(200).json(user.name);
});

//Atualizar nome do usuário
router.put('/users/update-username', async(req, res) => {
    const userID = req.userID;

    const { name } = req.body;

    const user = await prisma.usuario.update({
        where: {
            id: userID
        },
        data: {
            name: name
        }
    });

    res.status(200).json(user.name);
});

//Atualizar a lista de tarefas no banco de dados
router.put('/tasks', async(req, res) => {
    const { tasksList } = req.body;
    const userID = req.userID;
    
    try {
        await prisma.usuario.update({
            where: {
                id: userID
            },
            data: {
                tasksList: tasksList
            },
        });

        res.status(200).json({
            title: "A conta foi deletada!",
            info: "Redirecionando para a página de login..."
        });

    } catch(error) {
        console.log(error);
    };
});

//Atualizar senha do usuário
router.put('/users/update-password', async(req, res) => {
    const userID = req.userID;

    const { password } = req.body;

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    const user = await prisma.usuario.update({
        where: {
            id: userID
        },
        data: {
            password: hashPassword
        }
    });

    res.status(200).json(user.name);
});


//Deletar usuário
router.delete('/users', async(req, res) => {
    const userID = req.userID;

    try {
        await prisma.usuario.delete({
            where: {
                id: userID
            }
        });

        res.status(200).json({
            message: "Usuário deletado"
        });

    } catch(error) {
        console.log(error);
    };
});

export default router;


