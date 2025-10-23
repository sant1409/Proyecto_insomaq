// routes/laminas.js
const express = require('express');
const router = express.Router();
const connection = require('../database');

// Crear una lámina
router.post('/', (req, res) => {
  const { largo, ancho, id_tipo } = req.body;

  if (!largo || !ancho || !id_tipo) {
    return res.status(400).json({ error: 'Todos los campos (largo, ancho, id_tipo) son requeridos.' });
  }

  const query = 'INSERT INTO laminas (largo, ancho, id_tipo) VALUES (?, ?, ?)';
  connection.query(query, [largo, ancho, id_tipo], (err, results) => {
    if (err) {
      console.error('Error al insertar la lámina:', err);
      return res.status(500).json({ error: 'Error al insertar la lámina.' });
    }
    res.status(201).json({ message: 'Lámina agregada exitosamente', id: results.insertId });
  });
});

// Obtener todas las láminas
router.get('/', (req, res) => {
  const query = 'SELECT * FROM laminas';
  connection.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener las láminas.' });
    res.status(200).json(results);
  });
});

// Obtener una lámina por ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM laminas WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener la lámina.' });
    if (results.length === 0) return res.status(404).json({ message: 'Lámina no encontrada.' });
    res.status(200).json(results[0]);
  });
});

// Actualizar una lámina
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { largo, ancho, id_tipo } = req.body;

  if (!largo || !ancho || !id_tipo) {
    return res.status(400).json({ error: 'Todos los campos son requeridos.' });
  }

  const query = 'UPDATE laminas SET largo = ?, ancho = ?, id_tipo = ? WHERE id = ?';
  connection.query(query, [largo, ancho, id_tipo, id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar la lámina.' });
    if (results.affectedRows === 0) return res.status(404).json({ message: 'Lámina no encontrada.' });
    res.status(200).json({ message: 'Lámina actualizada exitosamente' });
  });
});

// Eliminar una lámina
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM laminas WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar la lámina.' });
    if (results.affectedRows === 0) return res.status(404).json({ message: 'Lámina no encontrada.' });
    res.status(200).json({ message: 'Lámina eliminada exitosamente' });
  });
});

module.exports = router;
