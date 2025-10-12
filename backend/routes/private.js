import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import e from 'express';

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
        console.error(error);
        res.status(500).json({
            title: "A lista de tarefas não foi atualizada!",
            info: "Não foi possível atualizar os dados."
        });
    };
});

//Pegar dados do usuário do banco de dados
router.get('/', async(req, res) => {
    try {
        const user = await prisma.usuario.findUnique({
            where: {
                id: req.userID
            }
        });

        res.status(200).json({
            tasksList: user.tasksList,
            username: user.name,
            profilePicture: user.profilePicture,
            role: user.role
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            title: "Não foi possível pegar os dados do usuário!",
            info: "Erro no servidor."
        });
    }
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

    try {
        await prisma.usuario.update({
            where: {
                id: req.userID
            },
            data: {
                name: name.slice(0, 20)
            }
        });

        res.status(204);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            title: "Não foi possível atualizar o nome!",
            info: "O nome não foi atualizado no servidor."
        })
    }

});


//Atualizar foto de perfil do usuário
router.put('/update/profile-photo', async(req, res) => {
    const { imagePath } = req.body;

    if (imagePath.trim() === "") {
        try {
            const user = await prisma.usuario.update({
                where: {
                    id: req.userID
                },
                data: {
                    profilePicture: ""
                }
            });

            return res.status(200).json(user.profilePicture);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                title: "Erro ao remover a foto de perfil!",
                info: "O servidor falhou em remover a foto de perfil do usuário."
            });
        }
    }

    try {
        const form = new FormData();

        form.append('image', imagePath.split(',')[1]);

        const response = await fetch(`https://imgbb.kevinhocerqueiradosanjos.workers.dev`, {
            method: "POST",
            body: form
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(400).json({
                title: "Não foi possível salvar a imagem!",
                info: "Tente novamente mais tarde."
            });
        };

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
        console.error(error);
        res.status(500).json({
            title: "Erro ao tentar salvar a imagem!",
            info: "Falha no servidor."
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
    };

    try {
        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(password, salt);

        await prisma.usuario.update({
            where: {
                id: req.userID
            },
            data: {
                password: hashPassword
            }
        });

        res.status(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            title: "Não foi possível atualizar a senha!",
            info: "A senha não foi atualizada no servidor."
        });
    }
});


//Deletar usuário
router.delete('/', async(req, res) => {
    try {
        await prisma.usuario.delete({
            where: {
                id: req.userID
            }
        });

        res.status(204).json({
            title: "Usuário deletado!",
            info: "O usuário foi deletado com sucesso do banco de dados."
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            title: "Não foi possível deletar o usuário!",
            info: "Erro no servidor."
        });
    };
});

export default router;