const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { sendEmail } = require('../config/email.config');

// Créer le dossier uploads s'il n'existe pas
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configuration de Multer pour le stockage des fichiers
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Route pour le téléchargement de fichier
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Aucun fichier n\'a été téléchargé' });
        }

        // Envoi de l'email de confirmation
        const emailSent = await sendEmail(
            req.body.email, // L'email du destinataire
            'Confirmation de téléchargement de fichier',
            `Votre fichier ${req.file.originalname} a été téléchargé avec succès.`,
            `<h1>Confirmation de téléchargement</h1>
            <p>Votre fichier <strong>${req.file.originalname}</strong> a été téléchargé avec succès.</p>
            <p>Taille du fichier : ${req.file.size} bytes</p>`
        );

        if (!emailSent) {
            console.warn('L\'email de confirmation n\'a pas pu être envoyé');
        }

        res.status(200).json({
            message: 'Fichier téléchargé avec succès',
            file: req.file
        });
    } catch (error) {
        console.error('Erreur lors du téléchargement:', error);
        res.status(500).json({
            message: 'Une erreur est survenue lors du téléchargement du fichier',
            error: error.message
        });
    }
});

module.exports = router;