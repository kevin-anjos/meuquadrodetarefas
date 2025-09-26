import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import auth from './middlewares/auth.js';
import publicRoutes from './routes/public.js';
import privateRoutes from './routes/private.js';

dotenv.config();

const app = express();

const __dirname = path.resolve();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.use(cors({
    origin: "https://meuquadrodetarefas.onrender.com"
}))

app.use(express.static(path.join(__dirname, 'frontend')));

app.use(express.json());

//Usar arquivo de rotas públicas
app.use('/', publicRoutes);

//Usar arquivo de rotas privadas
app.use('/', auth, privateRoutes);

const PORT =  process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));