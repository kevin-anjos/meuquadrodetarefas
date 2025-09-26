import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            title: "Sem token",
            info: "Tente novamente usando um token de acesso"
        });
    };

    try {
        const decodedData = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET); 

        //Usar o ID na requisição
        req.userID = decodedData.id;
        next();
    } catch (error) {
        res.status(401).json({
            title: "Token inválido",
            info: "Insira um token válido"
        })
    }
}

export default auth