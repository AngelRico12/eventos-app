import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: 'gondola.proxy.rlwy.net',
    user: 'root',
    password: 'BoMNEATcmypbSVNMdWXIhhqzkGSeafMf',
    database: 'railway',
    port: 50957,
    connectTimeout: 60000,
    acquireTimeout: 60000,
    timeout: 60000,
});

console.log('Conexión a MySQL establecida correctamente');
export default connection;

//mysql://root:BoMNEATcmypbSVNMdWXIhhqzkGSeafMf@gondola.proxy.rlwy.net:50957/railway