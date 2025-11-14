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

const gmailRegex = /^(?!.*\.\.)[A-Za-z0-9](?:[A-Za-z0-9._%+-]{0,62}[A-Za-z0-9])?@(gmail\.com|googlemail\.com)$/i;

//Criar usuário
router.post('/sign-up', async (req, res) => {
    const { name, email, password } = req.body;

    if (name.trim() === "" || !gmailRegex.test(email.trim()) || password.length < 8) {
        return res.status(400).json({
            title: "Dados inválidos!",
            info: "Preencha os dados corretamente."
        });
    };

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const lastPasswordChange = `${Date.now()}`

    try {
        const newUser = await prisma.usuario.create({
            data: {
                name: name.slice(0, 20),
                email: email,
                password: hashPassword,
                tasksList: '[]',
                profilePicture: '',
                role: 'user',
                lastPasswordChange
            }
        });

        const token = jwt.sign(
            { 
                id: newUser.id,
                role: newUser.role 
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '7d' }
        );

        res.status(201).json({token: token});

        transporter.sendMail({
            from: `Quadro de tarefas <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Usuário criado!',
            html: `<p>Olá, ${name}! Sua conta foi criada com sucesso! Você já pode usar o Quadro de Tarefas.</p>`
        })
        .catch(error => console.error("Erro ao enviar e-mail:", error));
    } catch(error) {
        console.error(error);
        return res.status(400).json({
            title: "Não foi possível criar a conta!",
            info: "Já existe um usuário com esse e-mail."
        });
    }
});

//Entrar na conta do usuário
router.post('/log-in', async (req, res) => {
    const { email, password } = req.body;

    if (!gmailRegex.test(email.trim()) || password.length < 8) {
        return res.status(400).json({
            title: "Dados inválidos!",
            info: "Preencha os dados corretamente."
        });
    };
    
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

        const token = jwt.sign(
            { 
                id: user.id,
                role: user.role 
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '7d' }
        );
        

        res.status(200).json({
            token: token
        });

        transporter.sendMail({
            from: `Quadro de tarefas <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Novo login',
            html: `<p>Um novo dispositivo entrou na sua conta.</p>`
        })
        .catch(error => console.error("Erro ao enviar e-mail:", error));
    } catch (error) {
        res.status(500).json({
            title: "Erro desconhecido!",
            info: "Erro no servidor."
        });
        console.error("ERROR: " + error);
    };
}); 

router.get('/last-password-change/:id', async(req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({
        message: "O ID não foi passado"
    });

    const user = await prisma.usuario.findUnique({
        where: {
            id
        }
    });

    res.status(200).json(user.lastPasswordChange);
});

export default router;