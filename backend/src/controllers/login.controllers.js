// Fichier: auth.routes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const SALT_ROUNDS = 10; // Niveau de complexité pour le hachage (standard)

/**
 * [Route 1.2] POST /api/auth/login
 * Gère la connexion de l'utilisateur.
 */
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const db = req.db;
    const jwtSecret = req.jwtSecret;

    if (!email || !password) {
        // [Critique] Retourne une erreur 400 si les données sont incomplètes
        return res.status(400).json({ message: 'Email et mot de passe sont requis.' });
    }

    // 1. Recherche de l'utilisateur dans la BDD
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error('Erreur lors de la recherche de l\'utilisateur:', err);
            return res.status(500).json({ message: 'Erreur interne du serveur.' });
        }

        if (results.length === 0) {
            // [Critique] Ne donne pas d'indication si c'est l'email ou le mot de passe qui est faux (sécurité)
            return res.status(401).json({ message: 'Identifiants invalides.' });
        }

        const user = results[0];
        
        // 2. Comparaison du mot de passe (haché)
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Identifiants invalides.' });
        }

        // 3. Génération du JWT (token d'authentification)
        const token = jwt.sign(
            { id: user.id, email: user.email },
            jwtSecret,
            { expiresIn: '1h' } // Le token expire après 1 heure
        );

        // 4. Succès: Renvoie le token et l'ID de l'utilisateur au Front-end
        res.status(200).json({ 
            token: token, 
            userId: user.id,
            message: 'Connexion réussie.'
        });
    });
});

/**
 * [Route Optionnelle] POST /api/auth/register
 * Gère l'inscription de l'utilisateur (utile pour les tests).
 */
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const db = req.db;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email et mot de passe sont requis.' });
    }

    try {
        // Hachage du mot de passe AVANT de le stocker
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // Insertion de l'utilisateur
        db.query(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            [email, hashedPassword],
            (err, results) => {
                if (err) {
                    // Erreur 409 si l'email existe déjà (conflit)
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(409).json({ message: 'Cet email est déjà utilisé.' });
                    }
                    console.error('Erreur d\'insertion de l\'utilisateur:', err);
                    return res.status(500).json({ message: 'Erreur interne du serveur.' });
                }

                res.status(201).json({ message: 'Utilisateur créé avec succès.', userId: results.insertId });
            }
        );
    } catch (e) {
        console.error('Erreur de hachage bcrypt:', e);
        res.status(500).json({ message: 'Erreur lors du traitement du mot de passe.' });
    }
});


module.exports = router;