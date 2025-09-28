import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const router = express.Router();

const prisma = new PrismaClient();


//Atualizar a lista de tarefas no banco de dados
router.put('/tasks', async(req, res) => {
    const { tasksList } = req.body;

    try {
        await prisma.usuario.update({
            where: {
                id: req.userID
            },
            data: {
                tasksList: tasksList
            },
        });

        res.status(200).json({
            title: "A lista de tarefas foi atualizada!",
            info: "Dados salvos no banco de dados."
        });

    } catch(error) {
        res.status(500).json({
            title: "A lista de tarefas não foi atualizada!",
            info: "Não foi possível atualizar os dados."
        });
        console.log(error);
    };
});

//Pegar a lista de tarefas e o nome do usuário do banco de dados
router.get('/', async(req, res) => {

    const user = await prisma.usuario.findUnique({
        where: {
            id: req.userID
        }
    });

    res.status(200).json({
        tasksList: user.tasksList,
        username: user.name
    });
});

//Atualizar nome do usuário
router.put('/update-username', async(req, res) => {
    const { name } = req.body;

    const user = await prisma.usuario.update({
        where: {
            id: req.userID
        },
        data: {
            name: name
        }
    });

    res.status(200).json(user.name);
});

//Atualizar senha do usuário
router.put('/update-password', async(req, res) => {
    const { password } = req.body;

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    const user = await prisma.usuario.update({
        where: {
            id: req.userID
        },
        data: {
            password: hashPassword
        }
    });

    res.status(200).json(user.name);
});


//Deletar usuário
router.delete('/', async(req, res) => {
    try {
        await prisma.usuario.delete({
            where: {
                id: req.userID
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