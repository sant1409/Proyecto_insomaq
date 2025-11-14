// routes/maquinas.js
const express = require('express');
const router = express.Router();
const connection = require('../database');

// Crear tipo de maquina
router.post('/', (req, res) => {
  const {  nombre,descripcion  } = req.body;

  if (!nombre || !descripcion) {
    return res.status(400).json({ error: 'El campo maquinas es requerido.' });
  }

  const query = 'INSERT INTO maquinas (nombre, descripcion) VALUES (?, ?)';
  connection.query(query, [nombre, descripcion], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al insertar el tipo de maquina.' });
    res.status(201).json({ message: ' maquina creado exitosamente', id: results.insertId });
  });
});

// Obtener todos los tipos
router.get('/', (req, res) => {
  const query = 'SELECT * FROM maquinas';
  connection.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener tipos de maquina.' });
    res.status(200).json(results);
  });
});

// Obtener uno por ID
router.get('/:id_maquina', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM maquinas WHERE id_maquina = ?';
  connection.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener la maquina.' });
    if (results.length === 0) return res.status(404).json({ message: 'Tipo de maquina no encontrado.' });
    res.status(200).json(results[0]);
  });
});

// Actualizar tipo de maquina
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { nombre,descripcion  } = req.body;

  if (!nombre || !descripcion) {
    return res.status(400).json({ error: 'El campo maquinas es requerido.' });
  }

  const query = 'UPDATE maquinas SET nombre = ?, descripcion = ? WHERE id_maquina = ?';
  connection.query(query, [nombre,descripcion, id], (err, results) => {

     if (err) return res.status(500).json({ error: 'Error al actualizar el tipo de maquina.' });
    res.status(201).json({ message: ' maquina actualizado exitosamente' });
  });
});

// Eliminar tipo de maquina
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM maquinas WHERE id_maquina = ?';
  connection.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar el tipo de maquina.' });
    if (results.affectedRows === 0) return res.status(404).json({ message: 'Tipo de maquina no encontrado.' });
    res.status(200).json({ message: 'Tipo de maquina eliminado exitosamente' });
  });
});

module.exports = router;
