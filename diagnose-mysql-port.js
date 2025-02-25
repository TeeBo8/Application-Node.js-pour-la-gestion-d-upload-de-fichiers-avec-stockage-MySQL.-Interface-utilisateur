const mysql = require('mysql2');

// Tableau des ports à tester
const portsToTest = [3306, 8889, 3307, 3308];

async function testMySQLConnection(port) {
    return new Promise((resolve) => {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root', // Mot de passe MAMP par défaut
            port: port
        });

        connection.connect((err) => {
            if (err) {
                console.log(`❌ Port ${port}: Connexion impossible`);
                resolve(false);
            } else {
                console.log(`✅ Port ${port}: Connexion réussie !`);
                connection.end();
                resolve(true);
            }
        });
    });
}

async function findWorkingMySQLPort() {
    console.log('🔍 Diagnostic des ports MySQL...');
    
    for (const port of portsToTest) {
        console.log(`Teste le port ${port}...`);
        const isWorking = await testMySQLConnection(port);
        
        if (isWorking) {
            console.log(`\n🎉 Port MySQL trouvé : ${port}`);
            console.log('Utilisez ce port dans votre configuration .env');
            console.log(`DB_PORT=${port}`);
            return port;
        }
    }

    console.log('❌ Aucun port MySQL trouvé. Vérifiez votre installation MAMP.');
}

findWorkingMySQLPort();