import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

import { Task } from '../Task.js';

const router = express.Router();

const prisma = new PrismaClient();


const getTasksList = async ({ id }) => {
    try {
        const user = await prisma.usuario.findUnique({
            where: {
                id
            }
        });

        return JSON.parse(user.tasksList);
    } catch (error) {
        console.error(error);
    }
};   

const updateTasksList = async ({ id, tasksList }) => {
    try {
        const user = await prisma.usuario.update({
            where: {
                id
            },
            data: {
                tasksList: JSON.stringify(tasksList)
            }
        });

        return JSON.parse(user.tasksList);
    } catch (error) {
        console.error(error);
    };
}

router.post('/tasks/create', async (req, res) => {

    const { name, description, category } = req.body;

    if (!name) return res.status(400).json({
        title: "O nome não foi passado"
    });

    const tasksList = await getTasksList({ id: req.userID });

    const taskExists = tasksList.some(
        task => task.name.toLowerCase() === name.toLowerCase()
    );

    if (taskExists) {
        return res.status(400).json({ title: "A tarefa já existe" });
    };

    const task = new Task({ name, description, category, id: tasksList.length });

    tasksList.push(task);

    if (category) {
        tasksList.forEach(task => {
            if (task.category["name"].toLowerCase() === category["name"].toLowerCase()) {
                task.category["color"] = category["color"];
            };
        });
    };

    await updateTasksList({ id: req.userID, tasksList });

    res.status(201).json(tasksList);

});

router.put('/tasks/edit/:id', async (req, res) => {

    const { name, description, category } = req.body;

    const { id: taskID } = req.params;

    if (!name && !description) return res.status(400).json({
        title: "Os dados não foram passados"
    });

    if (!taskID) return res.status(400).json({
        title: "O ID não foi passado"
    });

    const tasksList = await getTasksList({ id: req.userID });

    const task = tasksList.find(task => task.id === Number(taskID));

    task.isDone = false;
    task.finishedDate = undefined;

    if (category && category["name"].trim() !== "") {
        task.category = category;
        tasksList.forEach(task => {
            if (task.category["name"].toLowerCase() === category["name"].toLowerCase()) {
                task.category["color"] = category["color"];
            };
        });
    };

    if (description) task.description = description;

    if (name) task.name = name;
    
    await updateTasksList({ id: req.userID, tasksList });

    res.status(200).json(tasksList);

});

router.get('/tasks/toggle-done/:id', async (req, res) => {

    const { id: taskID } = req.params;

    if (!taskID) return res.status(400).json({
        title: "O ID não foi passado"
    });

    const tasksList = await getTasksList({ id: req.userID });

    if (tasksList.length <= Number(taskID)) return res.status(404).json({
        title: "Não existe uma tarefa com esse ID" 
    })

    const task = tasksList.find(task => task.id === Number(taskID));

    if (task.isDone) {
        task.isDone = false;
        task.finishedDate = undefined;
    } else {
        task.isDone = true;
        task.finishedDate = Task.getCurrentDate();
    };

    await updateTasksList({ id: req.userID, tasksList });

    res.status(200).json({
        tasksList
    });

});

router.delete('/tasks/delete/:id', async (req, res) => {

    const { id: taskID } = req.params;

    if (!taskID) return res.status(400).json({
        title: "Os ID não foi passado"
    });

    const tasksList = await getTasksList({ id: req.userID });

    
    const newTasksList = tasksList.filter(task => task.id !== Number(taskID));

    if (tasksList.length === newTasksList.length) return res.status(404).json({
        title: "Não existe uma tarefa com esse ID" 
    })

    let newID = -1;

    newTasksList.forEach(task => {
        newID++;
        task.id = newID;
    });

    await updateTasksList({ id: req.userID, tasksList: newTasksList })

    res.status(204).send();

});

router.delete('/tasks', async (req, res) => {

    const tasksList = new Array();

    await updateTasksList({ id: req.userID, tasksList });

    res.status(204).send();

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
        const user = await prisma.usuario.update({
            where: {
                id: req.userID
            },
            data: {
                name: name.slice(0, 20)
            }
        });

        res.status(200).json(user.name);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            title: "Não foi possível atualizar o nome!",
            info: "O nome não foi atualizado no servidor."
        });
    };
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

    const lastPasswordChange = `${Date.now()}`

    try {
        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(password, salt);

        await prisma.usuario.update({
            where: {
                id: req.userID
            },
            data: {
                password: hashPassword,
                lastPasswordChange
            }
        });

        res.status(204).send();
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