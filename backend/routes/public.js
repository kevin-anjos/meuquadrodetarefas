import express from 'express';
import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();


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

const router = express.Router();

//Criar usuário
router.post('/users/sign-up', async (req, res) => {
    const { name, email, password } = req.body;

    let userCreated = false;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        const newUser = await prisma.usuario.create({
            data: {
                name: name,
                email: email,
                password: hashPassword,
                tasksList: '[]'
            }
        });

        userCreated = true;

        res.status(201).json({id: newUser.id});

    } catch(error) {
        console.error(error);
    }

    if (!userCreated) {
        return res.status(400).json({
            title: "Não foi possível criar a conta!",
            info: "Já existe um usuário com esse e-mail."
        });
    };
    
    try {   
        await transporter.sendMail({
            from: `Quadro de tarefas <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Usuário criado!',
            html: `<p>Olá, ${name}! Sua conta foi criada com sucesso! Você já pode usar o Quadro de Tarefas.</p>`
        });
    } catch (error) {
        res.status(500).json({
            title: "Erro desconhecido!",
            info: "Erro no servidor."
        });
        console.error("ERROR: " + error);
    };
});

//Entrar na conta do usuário
router.post('/users/log-in', async (req, res) => {
    const { email, password } = req.body;
    
    let userExists = false;

    try {
        const user = await prisma.usuario.findUnique({
            where: {
                email: email
            }
        })

        if (!user) {
            return res.status(404).json({
                title: "Usuário não cadastrado!",
                info: "Não existe um usuário com esse e-mail."
            });
        };

        const passwordMatch = await bcrypt.compare(password, user.password); 
        
        if (!passwordMatch) {
            return res.status(400).json({
                title: "Senha incorreta!",
                info: "Verifique a sua senha."
            });
        };

        const token = jwt.sign({
            id: user.id
        }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        } );

        userExists = true;

        res.status(200).json({
            token: token
        });

    } catch (error) {
        res.status(500).json({
            title: "Erro desconhecido!",
            info: "Erro no servidor."
        });
        console.error("ERROR: " + error);
    };

    if (!userExists) return;

    try {   
        await transporter.sendMail({
            from: `Quadro de tarefas <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Novo login',
            html: `<p> Um novo dispositivo entrou na sua conta.</p>`
        });
    } catch (error) {
        console.error("ERROR: " + error);
    };
}); 

export default router;