// routes/tipo_lamina.js
const express = require('express');
const router = express.Router();
const connection = require('../database');

// Crear tipo de lámina
router.post('/', (req, res) => {
  const { tipo_lamina } = req.body;

  if (!tipo_lamina) {
    return res.status(400).json({ error: 'El campo tipo_lamina es requerido.' });
  }

  const query = 'INSERT INTO tipo_lamina (tipo_lamina) VALUES (?)';
  connection.query(query, [tipo_lamina], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al insertar el tipo de lámina.' });
    res.status(201).json({ message: 'Tipo de lámina creado exitosamente', id: results.insertId });
  });
});

// Obtener todos los tipos
router.get('/', (req, res) => {
  const query = 'SELECT * FROM tipo_lamina';
  connection.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener tipos de lámina.' });
    res.status(200).json(results);
  });
});

// Obtener uno por ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM tipo_lamina WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener el tipo de lámina.' });
    if (results.length === 0) return res.status(404).json({ message: 'Tipo de lámina no encontrado.' });
    res.status(200).json(results[0]);
  });
});

// Actualizar tipo de lámina
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { tipo_lamina } = req.body;

  if (!tipo_lamina) {
    return res.status(400).json({ error: 'El campo tipo_lamina es requerido.' });
  }

  const query = 'UPDATE tipo_lamina SET tipo_lamina = ? WHERE id = ?';
  connection.query(query, [tipo_lamina, id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar el tipo de lámina.' });
    if (results.affectedRows === 0) return res.status(404).json({ message: 'Tipo de lámina no encontrado.' });
    res.status(200).json({ message: 'Tipo de lámina actualizado exitosamente' });
  });
});

// Eliminar tipo de lámina
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM tipo_lamina WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar el tipo de lámina.' });
    if (results.affectedRows === 0) return res.status(404).json({ message: 'Tipo de lámina no encontrado.' });
    res.status(200).json({ message: 'Tipo de lámina eliminado exitosamente' });
  });
});

module.exports = router;
