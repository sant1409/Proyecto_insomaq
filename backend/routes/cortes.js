const express = require('express');
const router = express.Router();
const connection = require('../database');

// Ruta de prueba
router.post('/', (req, res) => {
    const {id_lamina, ancho_cortado, largo_cortado,	id_maquina,	id_usuario,	accion,	fecha } = req.body;
    if(!id_lamina || !ancho_cortado || !largo_cortado || !id_maquina || !id_usuario || !accion || !fecha) {
    return res.status(400).json({ error: 'Todos los campos son requeridos.' });
  }
    const query = `INSERT INTO cortes (id_lamina, ancho_cortado, largo_cortado, id_maquina, id_usuario, accion, fecha) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  connection.query(
    query,
    [id_lamina, ancho_cortado, largo_cortado, id_maquina, id_usuario, accion, fecha],
    (err, results) => { if (err) return res.status(500).json({ error: 'Error al insertar el corte.' });
      res.status(201).json({ message: 'Corte creado exitosamente', id: results.insertId });
    }
  );
});

// Actualizar un corte
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { id_lamina, ancho_cortado, largo_cortado, id_maquina, id_usuario, accion, fecha } = req.body;

  if (!id_lamina || !ancho_cortado || !largo_cortado || !id_maquina || !id_usuario || !accion || !fecha) {
    return res.status(400).json({ error: 'Todos los campos son requeridos.' });
  }
  const query = `UPDATE cortes SET id_lamina = ?, ancho_cortado = ?, largo_cortado = ?, id_maquina = ?, id_usuario = ?, accion = ?, fecha = ? WHERE id = ?`;
  connection.query( query, [id_lamina, ancho_cortado, largo_cortado, id_maquina, id_usuario, accion, fecha, id],
    (err, results) => {
      if (err) {
        console.error("Error SQL:", err);
        return res.status(500).json({ error: 'Error al actualizar el corte.' });
      }
      if (results.affectedRows === 0) return res.status(404).json({ error: 'Corte no encontrado.' });
      res.json({ message: 'Corte actualizado exitosamente.' });
    }
  );
});

// Obtener todos los cortes
router.get('/', (req, res) => {
  connection.query('SELECT * FROM cortes', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener los cortes.' });
    res.json(results);
  });
});

// Obtener un corte por id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM cortes WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener el corte.' });
    if (results.length === 0) return res.status(404).json({ error: 'Corte no encontrado.' });
    res.json(results[0]);
  });
});

// Eliminar un corte
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  connection.query('DELETE FROM cortes WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error("Error SQL:", err);
      return res.status(500).json({ error: 'Error al eliminar el corte.' });
    }
    if (results.affectedRows === 0) return res.status(404).json({ error: 'Corte no encontrado.' });
    res.json({ message: 'Corte eliminado exitosamente.' });
  });
});


module.exports = router;
