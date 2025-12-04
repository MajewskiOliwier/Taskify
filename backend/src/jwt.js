const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {

        return res.status(401).json({ message: 'Accès refusé. Token non fourni ou mal formaté.' });
    }

    const token = authHeader.split(' ')[1];

    try {

        const jwtSecret = process.env.JWT_SECRET || 'votre_jwt_secret_par_defaut';
        
        const decodedToken = jwt.verify(token, jwtSecret);

        req.userId = decodedToken.id;
        req.userEmail = decodedToken.email;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token invalide ou expiré.' });
    }
};