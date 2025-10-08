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

//Pegar dados do usuário do banco de dados
router.get('/', async(req, res) => {

    const user = await prisma.usuario.findUnique({
        where: {
            id: req.userID
        }
    });

    res.status(200).json({
        tasksList: user.tasksList,
        username: user.name,
        profilePicture: user.profilePicture
    });
});

//Atualizar nome do usuário
router.put('/update/username', async(req, res) => {
    const { name } = req.body;

    if (name.trim() === "") {
        return res.status(400).json({
            title: "Nome inválido!",
            info: "Digite um nome."
        });
    }

    const user = await prisma.usuario.update({
        where: {
            id: req.userID
        },
        data: {
            name: name.slice(0, 20)
        }
    });

    res.status(200).json(user.name);
});


//Atualizar foto de perfil do usuário
router.put('/update/profile-photo', async(req, res) => {
    const { imagePath } = req.body;

    console.log('API Key: ', process.env.IMGBB_API_KEY);
 
    try {
        const form = new FormData();

        form.append('image', imagePath.split(',')[1]);

        const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, {
            method: "POST",
            body: form
        });


        console.log(response);

        const data = await response.json();

        console.log(data);

        if (!response.ok) {
            return res.status(400).json({
                title: "Não foi possível salvar a imagem",
                info: "Tente novamente mais tarde"
            });
        }

        const imageURL = data['data']['image']['url'];

        const user = await prisma.usuario.update({
            where: {
                id: req.userID
            },
            data: {
                profilePicture: imageURL
            }
        });

        res.status(200).json(user.profilePicture);
       
    } catch(error) {
        console.log(error);
        res.status(500).json({
            title: "Erro ao tentar salvar a imagem",
            info: "Tente novamente mais tarde."
        });
    }
});

//Atualizar senha do usuário
router.put('/update/password', async(req, res) => {
    const { password } = req.body;

    if (password.length < 8) {
        return res.status(400).json({
            title: "Senha inválida!",
            info: "A senha tem menos de 8 caracteres."
        });
    }

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