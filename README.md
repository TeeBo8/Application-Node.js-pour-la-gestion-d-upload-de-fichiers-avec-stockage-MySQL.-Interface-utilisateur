# Application d'Upload de Fichiers avec Node.js et MySQL

## 📝 Description
Une application web permettant l'upload de fichiers avec stockage des informations utilisateur dans une base de données MySQL.

## ✨ Fonctionnalités
- Upload de fichiers image (JPEG, PNG)
- Validation des fichiers
- Stockage des informations utilisateur
- Interface utilisateur responsive
- Gestion des erreurs

## 🛠 Technologies Utilisées
- Node.js (v14+)
- Express.js (v4.17+)
- MySQL (v5.7+ ou v8.0+)
- Multer (v1.4+) pour l'upload de fichiers
- EJS (v3.1+) pour le templating
- dotenv (v16.0+) pour la gestion des variables d'environnement
- express-session (v1.17+) pour la gestion des sessions
- mysql2 (v2.3+) pour la connexion MySQL

## 📋 Prérequis
- Node.js (v14+ recommandé)
- MySQL (v5.7+ ou v8.0+)
- MAMP/XAMPP/Serveur MySQL local
- npm v6+ ou yarn v1.22+
- Un éditeur de texte (VSCode recommandé)
- Git

### Configuration de MAMP/XAMPP
#### MAMP
1. Téléchargez et installez MAMP depuis [mamp.info](https://www.mamp.info/)
2. Port MySQL par défaut : 8889 (peut être modifié dans les préférences)
3. Vérifiez que les services Apache et MySQL sont démarrés (voyants verts)

#### XAMPP
1. Téléchargez et installez XAMPP depuis [apachefriends.org](https://www.apachefriends.org/)
2. Port MySQL par défaut : 3306
3. Démarrez les modules Apache et MySQL depuis le panneau de contrôle

## 🚀 Installation

### 1. Clonage du dépôt
```bash
git clone [URL_DU_DEPOT]
cd nom-du-projet
```

### 2. Installation des dépendances
```bash
npm install
```

### 3. Configuration de la base de données
- Créez une base de données `upload_db`
- Exécutez le script `database.sql` dans phpMyAdmin

### 4. Configuration de l'environnement
- Copiez `.env.example` vers `.env`
- Ajustez les paramètres de connexion MySQL dans le fichier `.env` :
  ```env
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=root      # 'root' pour MAMP, '' (vide) pour XAMPP par défaut
  DB_NAME=upload_db
  DB_PORT=8889         # 8889 pour MAMP, 3306 pour XAMPP
  ```
- Assurez-vous que le dossier `uploads/` existe et a les permissions d'écriture

### 5. Démarrage de l'application
```bash
node app.js
```

## 📂 Structure du Projet
```
.
├── app.js             # Point d'entrée principal
├── config.js          # Configuration de l'application
├── database.sql       # Script de création de base de données
├── middlewares/       # Middlewares personnalisés
├── public/            # Fichiers statiques
│   ├── css/
│   └── uploads/
├── routes/            # Définition des routes
└── views/             # Templates EJS
```

## 🔒 Sécurité
- Validation des fichiers
- Limitation de la taille des fichiers
- Protection contre les uploads malveillants

## 🐛 Dépannage

### Problèmes de connexion MySQL
1. **Erreur "Connection refused"**
   - Vérifiez que MySQL est bien démarré
   - Confirmez le port utilisé (8889 pour MAMP, 3306 pour XAMPP)
   - Utilisez l'outil `diagnose-mysql-port.js` pour vérifier la connexion

2. **Erreur "Access denied"**
   - Vérifiez les identifiants dans le fichier `.env`
   - Assurez-vous que l'utilisateur a les droits sur la base de données
   - Pour MAMP : utilisateur = 'root', mot de passe = 'root'
   - Pour XAMPP : utilisateur = 'root', mot de passe = '' (vide)

3. **Erreur "Unknown database"**
   - Vérifiez que la base de données `upload_db` existe
   - Exécutez à nouveau le script `database.sql`

### Problèmes d'upload
1. **Erreur "File too large"**
   - Vérifiez la taille maximale dans `config.js`
   - Ajustez `upload_max_filesize` dans php.ini si nécessaire

2. **Erreur "Permission denied"**
   - Vérifiez les permissions du dossier `uploads/`
   - Chmod 755 ou 775 sur le dossier

### Autres problèmes courants
- Nettoyez le cache du navigateur
- Vérifiez les logs dans la console
- Redémarrez le serveur Node.js
- Assurez-vous que tous les ports nécessaires sont disponibles

## 📄 Licence
[Votre licence, par exemple MIT]

## 👥 Contributeurs
- [Votre nom]
```