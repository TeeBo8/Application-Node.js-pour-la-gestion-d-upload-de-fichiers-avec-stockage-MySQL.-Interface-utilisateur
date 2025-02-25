const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mysql = require('mysql2/promise');
const config = require('../config');

// Configuration de multer pour l'upload
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Filtre pour accepter uniquement les images JPEG et PNG
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Format de fichier non autorisé. Utilisez JPEG ou PNG.'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // Limite à 5MB
    }
});

// Création du pool de connexion MySQL
const pool = mysql.createPool({
    ...config.database,
    connectionLimit: 10,
    connectTimeout: 10000, // 10 secondes
    acquireTimeout: 10000, // 10 secondes
    waitForConnections: true
});

// Gestion des erreurs de connexion
pool.on('connection', (connection) => {
    console.log('Nouvelle connexion MySQL établie');
});

pool.on('error', (err) => {
    console.error('Erreur de pool MySQL:', err);
});

// Route pour afficher le formulaire
router.get('/', (req, res) => {
    res.render('index', { 
        title: 'Formulaire d\'Upload',
        message: 'Remplissez le formulaire' 
    });
});

// Route pour traiter l'upload
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            throw new Error('Aucune image n\'a été uploadée');
        }

        const { nom, email } = req.body;
        const imagePath = '/uploads/' + req.file.filename;

        // Insertion dans la base de données
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.execute(
                'INSERT INTO users (nom, email, image_path) VALUES (?, ?, ?)',
                [nom, email, imagePath]
            );

            // Affichage de la page de succès
            res.render('success', {
                nom: nom,
                email: email,
                imagePath: imagePath
            });
        } finally {
            connection.release();
        }

    } catch (error) {
        console.error('Erreur:', error);
        res.status(400).render('error', {
            message: error.message || 'Une erreur est survenue lors de l\'upload'
        });
    }
});

module.exports = router;