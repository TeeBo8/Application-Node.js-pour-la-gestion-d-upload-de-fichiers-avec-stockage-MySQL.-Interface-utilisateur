const multer = require('multer');
const path = require('path');
const config = require('../config');

// Configuration du stockage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.upload.path);
    },
    filename: (req, file, cb) => {
        // Nom de fichier unique : timestamp + nom original
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Filtre pour les fichiers
const fileFilter = (req, file, cb) => {
    // Vérification du type de fichier
    const allowedTypes = config.upload.allowedTypes;
    const extname = allowedTypes.includes(file.mimetype);
    
    if (extname) {
        cb(null, true);
    } else {
        cb(new Error('Type de fichier non autorisé. Seules les images sont acceptées.'), false);
    }
};

// Configuration de Multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: config.upload.maxFileSize // Limite de taille définie dans config
    }
});

module.exports = upload;