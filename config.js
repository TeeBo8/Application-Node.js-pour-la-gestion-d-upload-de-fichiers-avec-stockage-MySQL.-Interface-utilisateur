require('dotenv').config();

module.exports = {
    // Configuration du serveur
    server: {
        port: process.env.PORT || 3001
    },
    
    // Configuration de la base de données MySQL
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || 'upload_db'
    },
    
    // Configuration des uploads
    upload: {
        path: process.env.UPLOAD_PATH || './public/uploads',
        maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB par défaut
        allowedTypes: ['image/jpeg', 'image/png', 'image/gif']
    }
};