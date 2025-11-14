const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 4000; // 👈 usa un puerto diferente al de React

// Middleware
app.use(cors({
  origin: true, // permite cualquier origen dinámicamente
  credentials: true
}));

// app.use(cors({
//   origin: ["http://localhost:3000", "http://localhost:3001"],
//   credentials: true
// }));

app.use(bodyParser.json());
app.use(express.json());

// Importar rutas
const laminasRoutes = require('./routes/laminas');
const tipoLaminaRoutes = require('./routes/tipo-laminas');
const maquinasRoutes = require('./routes/maquinas');
const usuariosRoutes = require('./routes/usuarios');
const retazosRoutes = require('./routes/retazos');
const cortesRoutes = require('./routes/cortes');

// Rutas
app.use(express.static('public'));
app.use('/laminas', laminasRoutes);
app.use('/tipo-laminas', tipoLaminaRoutes);
app.use('/maquinas', maquinasRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/retazos', retazosRoutes);
app.use('/cortes', cortesRoutes);

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`✅ Servidor backend corriendo en http://localhost:${port}`);
});
