import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
    const token = req.headers.authorization.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({
            title: "Não há token",
            info: "Você precisa de um token para acessar essa rota"
        });
    }

    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        if (decodedData.role !== "admin") {
            return res.status(401).json({
                title: "Acesso negado",
                info: "Você não é um ADMIN"
            });
        };

        next();

    } catch (error) {
        console.error(error);
        res.status(401).json({
            title: "Token inválido",
            info: "Tente um token válido"
        });
    };
};

export default adminAuth;