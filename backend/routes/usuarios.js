// routes/laminas.js
const express = require('express');
const router = express.Router();
const connection = require('../database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'token12345';

// Middleware para proteger rutas
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token faltante' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inválido' });
        req.user = user;
        next();
    });
}

// Registrarse
router.post('/registrarse', async (req, res) => {
    const { nombre, email, contraseña } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        connection.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
            if (err) return res.status(500).json({ message: err.message });
            if (results.length > 0) return res.status(400).json({ message: 'Usuario ya registrado' });

            connection.query(
                'INSERT INTO usuarios (nombre, email, contraseña) VALUES (?, ?, ?)',
                [nombre, email, hashedPassword],
                (err, results) => {
                    if (err) return res.status(500).json({ message: err.message });
                    const id_usuario = results.insertId;

                    const token = jwt.sign({ id: id_usuario, nombre }, SECRET_KEY, { expiresIn: '1h' });
                    res.json({ message: 'Registro exitoso', id_usuario, nombre, email, token });
                }
            );
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Iniciar sesión
router.post('/iniciar_sesion', (req, res) => {
    const { email, contraseña } = req.body;

    connection.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        if (results.length === 0) return res.status(401).json({ message: 'Email o contraseña incorrectos' });

        const user = results[0];
        const isMatch = await bcrypt.compare(contraseña, user.contraseña);
        if (!isMatch) return res.status(401).json({ message: 'Email o contraseña incorrectos' });

        const token = jwt.sign({ id: user.id, nombre: user.nombre }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: `Login exitoso. Bienvenido ${user.nombre}`, token });
    });
});

// Obtener todos los usuarios
router.get('/', authenticateToken, (req, res) => {
    connection.query('SELECT id, nombre, email FROM usuarios', (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(200).json(results);
    });
});

// Obtener un usuario por ID
router.get('/:id', authenticateToken, (req, res) => {
    const id = req.params.id;
    connection.query('SELECT id, nombre, email FROM usuarios WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json(results[0]);
    });
});

module.exports = router;
