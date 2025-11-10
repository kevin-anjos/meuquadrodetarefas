import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import http from 'http';

import userAuth from './middlewares/userAuth.js';
import adminAuth from './middlewares/adminAuth.js'
import publicRoutes from './routes/public.js';
import privateRoutes from './routes/private.js';
import adminRoutes from './routes/admin.js'
import { createWebSocketServer } from './socket.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, 'frontend')));

//Caminhos do site
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", 'auth', "index.html"));
});

app.get("/authe", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", 'auth', "auth.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", 'dashboard', 'dashboard.html'));
});

app.get('/administrator', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'admin', 'admin.html'));
});

app.use(cors());

app.use(express.json({ limit: '32mb' }));
app.use(express.urlencoded({ extended: true, limit: '32mb' }));

//Usar arquivo de rotas públicas
app.use('/', publicRoutes);

//Usar arquivo de rotas privadas
app.use('/users', userAuth, privateRoutes);
app.use('/admin', adminAuth, adminRoutes);

const PORT =  process.env.PORT;

createWebSocketServer(server);

server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));