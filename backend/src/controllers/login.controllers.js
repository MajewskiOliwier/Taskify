const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/login.model');

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

module.exports = {
    login: (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email et mot de passe sont requis.' });
        }

        User.findByEmail(email, async (err, results) => {
            if (err) {
                console.error('Erreur lors de la recherche de l\'utilisateur:', err);
                return res.status(500).json({ message: 'Erreur interne du serveur.' });
            }

            if (results.length === 0) {
                return res.status(401).json({ message: 'Identifiants invalides.' });
            }

            const user = results[0];
            
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({ message: 'Identifiants invalides.' });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

            const cookieOptions = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 1000
            };

            res.cookie('token', token, cookieOptions);
            res.status(200).json({ 
                userId: user.id,
                message: 'Connexion réussie.'
            });
        });
    },

    register: async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email et mot de passe sont requis.' });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

            User.create(email, hashedPassword, (err, results) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(409).json({ message: 'Cet email est déjà utilisé.' });
                    }
                    console.error('Erreur d\'insertion de l\'utilisateur:', err);
                    return res.status(500).json({ message: 'Erreur interne du serveur.' });
                }

                res.status(201).json({ message: 'Utilisateur créé avec succès.', userId: results.insertId });
            });
        } catch (e) {
            console.error('Erreur de hachage bcrypt:', e);
            res.status(500).json({ message: 'Erreur lors du traitement du mot de passe.' });
        }
    },

    logout: (req, res) => {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });
        res.status(200).json({ message: 'Déconnexion réussie.' });
    }
};