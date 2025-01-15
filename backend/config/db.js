require('dotenv').config({ path: './.env' }); // Carga el archivo .env

const mysql = require('mysql2');

// Configuración de la conexión
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Crear conexión
const connection = mysql.createConnection(dbConfig);

// Conectar a la base de datos
connection.connect((error) => {
  if (error) {
    console.error('Error al conectar con la base de datos:', error.message);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

module.exports = connection;
