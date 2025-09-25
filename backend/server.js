import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';
import path from 'path';

dotenv.config();
const prisma = new PrismaClient();

const app = express();

const __dirname = path.resolve();

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'frontend')));

// Rota raiz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

/*
app.use(cors({
    origin: "https://meuquadrodetarefas.onrender.com"
}));*/


app.use(cors())
app.use(express.json());



//Verificar autenticidade do usuário
let isUserValid = false;

//Criar transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
})

//Pegar a lista de tarefas atual no banco de dados
app.get('/tasks/:i', async(req, res) => {

    if (!isUserValid) {
        return res.status(400).json({
            title: "Chamada não autêntica!",
            info: "Chamada inválida."
        });
    };

    const { i } = req.params;

    const user = await prisma.usuario.findUnique({
            where: {
                id: i
            }
        }
    );

    res.status(200).json(user.tasksList);
});

//Pegar o nome de usuário atual no banco de dados
app.get('/users/:i', async(req, res) => {

    const { i } = req.params;

    const user = await prisma.usuario.findUnique({
            where: {
                id: i
            }
        }
    );

    res.status(200).json(user.name);
});


//Atualizar a lista de tarefas no banco de dados
app.post('/tasks/:i', async(req, res) => {
    const { tasksList } = req.body;
    const { i } = req.params;
    
    try {
        await prisma.usuario.update({
            where: {
                id: i
            },
            data: {
                tasksList: tasksList
            },
        });
    } catch(error) {
        console.log(error);
    }
});


//Criar usuário
app.post('/create-user', async (req, res) => {
    const { name, email, password } = req.body;
    console.log('test')

    let userCreated = false;

    try {
        const newUser = await prisma.usuario.create({
            data: {
                name: name,
                email: email,
                password: password,
                tasksList: 'empty'
            }
        });

        userCreated = true;

        isUserValid = true;

        res.status(201).json({id: newUser.id});

    } catch(error) {
        console.error(error);
    }

    if (userCreated) {
        try {   
            await transporter.sendMail({
                from: `Quadro de tarefas <${process.env.EMAIL_USER}>`,
                to: email,
                subject: 'Usuário criado!',
                html: `<p>Olá, ${name}! Sua conta foi criada com sucesso! Você já pode usar o Quadro de Tarefas.</p>`
            });
        } catch (error) {
            throw new Error('Não foi possível enviar o e-mail');
        };
    } else {
        res.status(400).json({
            title: "Não foi possível criar a conta!",
            info: "Já existe um usuário com esse e-mail."
        });
    }
});


//Entrar na conta do usuário
app.post('/enter-user-account', async (req, res) => {
    const { email, password } = req.body;
    
    let userExists = false;

    try {
        const user = await prisma.usuario.findFirst({
            where: {
                email: email
            }
        })

        if (!user) {
            return res.status(400).json({
                title: "Usuário não cadastrado!",
                info: "Não existe um usuário com esse e-mail."
            });
        };

        if (user.password !== password) {
            return res.status(400).json({
                title: "Senha incorreta!",
                info: "Verifique a sua senha."
            });
        };
        userExists = true;
        isUserValid = true;
        res.status(200).json({id: user.id});

    } catch (error) {
        console.error(`Error: ${error}`);
    };

    if (!userExists) return

    try {   
        await transporter.sendMail({
            from: `Quadro de tarefas <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Novo login',
            html: `<p> Um novo dispositivo entrou na sua conta.</p>`
        });
    } catch (error) {
        console.error(`Error: ${error}`);
    };
}); 


//Deletar usuário
app.delete('/users/:i', async(req, res) => {
    const { i } = req.params;

    try {
        await prisma.usuario.delete({
            where: {
                id: i
            }
        });

        res.status(200).json({
            message: "Usuário deletado"
        });

    } catch(error) {
        console.log(error);
    };
});

const PORT =  process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));