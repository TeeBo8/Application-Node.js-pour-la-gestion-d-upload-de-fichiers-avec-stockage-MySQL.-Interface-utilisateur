# Application d'Upload de Fichiers

## Description
Application Node.js permettant l'upload de fichiers avec stockage en base de données MySQL.

## Prérequis
- Node.js
- MySQL
- MAMP/XAMPP

## Installation
1. Clonez le dépôt
2. Installez les dépendances :
   ```
   npm install
   ```

3. Créez la base de données :
   - Ouvrez phpMyAdmin
   - Créez une base `upload_db`
   - Exécutez `database.sql`

4. Démarrez l'application :
   ```
   node app.js
   ```

## Fonctionnalités
- Upload de fichiers image
- Stockage des informations en base de données
- Validation des fichiers
- Interface utilisateur simple

## Configuration
Voir `config.js` pour les paramètres de connexion