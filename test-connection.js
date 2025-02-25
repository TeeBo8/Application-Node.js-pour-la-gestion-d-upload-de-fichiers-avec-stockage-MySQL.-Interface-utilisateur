const { testConnection } = require('./database/connection');

async function checkMySQLConnection() {
    console.log('🔍 Test de connexion à MySQL (MAMP)...');
    const connected = await testConnection();
    
    if (connected) {
        console.log('🟢 Connexion réussie !');
        console.log('Vous pouvez maintenant démarrer l\'application.');
    } else {
        console.log('🔴 Échec de connexion.');
        console.log('Vérifiez :');
        console.log('- MAMP est-il lancé ?');
        console.log('- Les paramètres de connexion sont-ils corrects ?');
    }
}

checkMySQLConnection();