# Documentation des Modules Node.js

Cette documentation détaille les différents modules utilisés dans notre application de gestion d'upload de fichiers et d'insertion dans MySQL.

## Table des matières
1. [Modules de Base](#modules-de-base)
2. [Gestion des Fichiers](#gestion-des-fichiers)
3. [Sécurité](#sécurité)
4. [Utilitaires](#utilitaires)
5. [Template Engine](#template-engine)
6. [Logging](#logging)

## Modules de Base

### Express
**Installation :** `npm install express`

Express est un framework web minimaliste pour Node.js. Il simplifie la création d'applications web et d'APIs.

```javascript
const express = require('express');
const app = express();

// Configuration de base
app.use(express.json()); // Pour parser le JSON
app.use(express.urlencoded({ extended: true })); // Pour parser les données de formulaire

// Exemple de route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Démarrage du serveur
app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});
```

### MySQL2
**Installation :** `npm install mysql2`

MySQL2 est un client MySQL pour Node.js avec support des promesses.

```javascript
const mysql = require('mysql2');

// Configuration de la connexion
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'votre_user',
    password: 'votre_password',
    database: 'votre_db'
});

// Exemple d'utilisation avec promesses
const query = async () => {
    try {
        const [rows] = await connection.promise().query('SELECT * FROM users');
        console.log(rows);
    } catch (error) {
        console.error(error);
    }
};
```

## Gestion des Fichiers

### Multer
**Installation :** `npm install multer`

Multer est un middleware pour gérer l'upload de fichiers.

```javascript
const multer = require('multer');

// Configuration du stockage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/') // Dossier de destination
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname) // Nom du fichier
    }
});

// Configuration de Multer
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Vérification du type de fichier
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Format de fichier non supporté'));
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // Limite à 5MB
    }
});

// Utilisation dans une route
app.post('/upload', upload.single('photo'), (req, res) => {
    res.json({ file: req.file });
});
```

## Sécurité

### Helmet
**Installation :** `npm install helmet`

Helmet aide à sécuriser l'application Express en définissant divers en-têtes HTTP.

```javascript
const helmet = require('helmet');

// Utilisation basique
app.use(helmet());

// Configuration personnalisée
app.use(helmet({
    contentSecurityPolicy: false,
    xssFilter: true
}));
```

### Express Validator
**Installation :** `npm install express-validator`

Express Validator permet de valider et d'assainir les données entrantes.

```javascript
const { body, validationResult } = require('express-validator');

// Règles de validation
const validateUser = [
    body('email').isEmail().normalizeEmail(),
    body('name').trim().notEmpty().escape(),
    body('age').isInt({ min: 0 })
];

// Utilisation dans une route
app.post('/user', validateUser, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Traitement des données validées
});
```

## Utilitaires

### Dotenv
**Installation :** `npm install dotenv`

Dotenv charge les variables d'environnement depuis un fichier .env.

```javascript
// .env
DB_HOST=localhost
DB_USER=root
DB_PASS=password

// Usage
require('dotenv').config();
console.log(process.env.DB_HOST); // affiche 'localhost'
```

### CORS
**Installation :** `npm install cors`

CORS permet de gérer les requêtes Cross-Origin.

```javascript
const cors = require('cors');

// Utilisation basique
app.use(cors());

// Configuration personnalisée
app.use(cors({
    origin: 'http://example.com',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
```

## Template Engine

### EJS
**Installation :** `npm install ejs`

EJS est un moteur de template simple et efficace.

```javascript
// Configuration
app.set('view engine', 'ejs');

// Exemple de template (views/index.ejs)
<h1><%= title %></h1>
<p><%= message %></p>

// Route
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Accueil',
        message: 'Bienvenue!'
    });
});
```

## Email

### Nodemailer
**Installation :** `npm install nodemailer`

Nodemailer est un module pour envoyer des emails depuis Node.js.

```javascript
const nodemailer = require('nodemailer');

// Configuration du transporteur
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',  // ou votre serveur SMTP
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Exemple d'envoi d'email
async function sendEmail() {
    try {
        const info = await transporter.sendMail({
            from: '"Votre Nom" <votre@email.com>',
            to: "destinataire@email.com",
            subject: "Sujet de l'email",
            text: "Contenu en texte simple",
            html: "<b>Contenu en HTML</b>"
        });
        console.log('Email envoyé:', info.messageId);
    } catch (error) {
        console.error('Erreur lors de l\'envoi:', error);
    }
}
```

## Logging

### Morgan
**Installation :** `npm install morgan`

Morgan est un middleware de logging HTTP.

```javascript
const morgan = require('morgan');

// Utilisation basique (format 'dev')
app.use(morgan('dev'));

// Format personnalisé
app.use(morgan(':method :url :status :response-time ms'));
```

## Installation Complète

Pour installer tous les modules nécessaires :

```bash
npm install express mysql2 multer helmet express-validator dotenv cors ejs morgan
```

## Bonnes Pratiques

1. **Sécurité**
   - Toujours valider les entrées utilisateur
   - Utiliser des variables d'environnement pour les données sensibles
   - Implémenter des limites pour l'upload de fichiers

2. **Performance**
   - Utiliser la compression pour les réponses
   - Mettre en cache les ressources statiques
   - Optimiser les requêtes de base de données

3. **Maintenance**
   - Organiser le code en modules
   - Documenter les fonctions importantes
   - Utiliser le logging pour le debugging

4. **Gestion des Erreurs**
   - Implémenter un gestionnaire d'erreurs global
   - Logger les erreurs de manière appropriée
   - Renvoyer des messages d'erreur appropriés aux utilisateurs