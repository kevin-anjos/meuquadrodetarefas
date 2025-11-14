import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            title: "Sem token",
            info: "Tente novamente usando um token de acesso"
        });
    };

    try {
        const decodedData = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET); 

        const response = await fetch(`http://localhost:8080/last-password-change/${decodedData.id}`);

        const lastPasswordChange = await response.json();

        if (Number(lastPasswordChange) > decodedData.iat * 1000) {
            return res.status(401).json({
                title: "Token inválido",
                info: "Insira um token válido"
            });
        };

        //Usar o ID na requisição
        req.userID = decodedData.id;
        next();
    } catch (error) {
        res.status(401).json({
            title: "Token inválido",
            info: "Insira um token válido"
        });
    };
};

export default userAuth;