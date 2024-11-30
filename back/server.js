const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

// Configurar la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Reemplaza con tu usuario MySQL
  password: '', // Reemplaza con tu contraseña MySQL
  database: 'calculadora' // Reemplaza con el nombre de tu base de datos MySQL
});

// Conectar a la base de datos MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos MySQL:', err);
    return;
  }
  console.log('Conexión a MySQL establecida');
});

app.use(bodyParser.json());
app.use(cors());

// Ruta para guardar una nueva operación
app.post('/api/operaciones', (req, res) => {
  const { operandoA, operandoB, resultado } = req.body;
  const query = 'INSERT INTO operaciones (operandoA, operandoB, resultado) VALUES (?, ?, ?)';
  connection.query(query, [operandoA, operandoB, resultado], (err, result) => {
    if (err) {
      console.error('Error al guardar la operación:', err);
      res.status(500).send('Error al guardar la operación');
      return;
    }
    console.log('Operación guardada correctamente');
    res.status(201).send('Operación guardada correctamente');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
