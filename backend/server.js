import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import userAuth from './middlewares/userAuth.js';
import adminAuth from './middlewares/adminAuth.js'
import publicRoutes from './routes/public.js';
import privateRoutes from './routes/private.js';
import adminRoutes from './routes/admin.js'

dotenv.config();

const app = express();

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, 'frontend')));

//Caminhos do site
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", 'dashboard.html'));
});

app.get('/administrator', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'admin.html'));
});

app.use(cors());

app.use(express.json({ limit: '32mb' }));
app.use(express.urlencoded({ extended: true, limit: '32mb' }));

//Usar arquivo de rotas públicas
app.use('/', publicRoutes);

//Usar arquivo de rotas privadas
app.use('/users', userAuth, privateRoutes);

app.use('/admin', adminAuth, adminRoutes);

const PORT =  process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));