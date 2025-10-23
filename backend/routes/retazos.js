// routes/tipo_lamina.js
const express = require('express');
const router = express.Router();
const connection = require('../database');

// Crear tipo de lámina
router.post('/', (req, res) => {
  const { id_lamina_original, ancho, largo, id_maquina, fecha_corte } = req.body;
  if (!id_lamina_original || !ancho || !largo || !id_maquina || !fecha_corte) {
    return res.status(400).json({ error: 'Todos los campos son requeridos.' });
  }
  const query = `INSERT INTO retazos (id_lamina_original, ancho, largo, id_maquina, fecha_corte) VALUES (?, ?, ?, ?, ?)`;
  connection.query(
    query,
    [id_lamina_original, ancho, largo, id_maquina, fecha_corte],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Error al insertar el tipo de lámina.' });
      res.status(201).json({ message: 'Tipo de lámina creado exitosamente', id: results.insertId });
    }
  );
});

// Actualizar retazo
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { id_lamina_original, ancho, largo, id_maquina, fecha_corte } = req.body;

  if (!id_lamina_original || !ancho || !largo || !id_maquina || !fecha_corte) {
    return res.status(400).json({ error: 'Todos los campos son requeridos.' });
  }
  const query = `UPDATE retazos SET id_lamina_original = ?, ancho = ?, largo = ?, id_maquina = ?, fecha_corte = ? WHERE id = ?`;
  connection.query(
    query,
    [id_lamina_original, ancho, largo, id_maquina, fecha_corte, id],
    (err, results) => {
      if (err) {
        console.error("Error SQL:", err);
        return res.status(500).json({ error: 'Error al actualizar el retazo.' });
      }
      if (results.affectedRows === 0) return res.status(404).json({ error: 'Retazo no encontrado.' });
      res.json({ message: 'Retazo actualizado exitosamente.' });
    }
  );
});

// Obtener un retazo por id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM retazos WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener el retazo.' });
    if (results.length === 0) return res.status(404).json({ error: 'Retazo no encontrado.' });
    res.json(results[0]);
  });
});

// Obtener todos los retazos
router.get('/', (req, res) => {
  connection.query('SELECT * FROM retazos', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener los retazos.' });
    res.json(results);
  });
});

// Eliminar un retazo por id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM retazos WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error SQL:", err);
      return res.status(500).json({ error: 'Error al eliminar el retazo.' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Retazo no encontrado.' });
    }
    res.json({ message: 'Retazo eliminado exitosamente.' });
  });
});

module.exports = router;
