const connection = require('./config/db');

// Realizar una consulta simple para verificar que la conexión funciona
connection.query('SELECT 1 + 1 AS result', (error, results) => {
  if (error) {
    console.error('Error al realizar consulta:', error.message);
  } else {
    console.log('Consulta exitosa, resultado:', results[0].result);
  }

  // Finaliza la conexión
  connection.end();
});
