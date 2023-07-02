const express = require('express');
const cors = require("cors");
const mysql = require('mysql');

const port = 5000;
const app = express();
let config = require('./config.js')
let connection = mysql.createConnection(config);
app.use(cors())
app.use(express.json())


connection.connect((err) => {
  if (err) throw err;
  console.log("Connected successfully to database!");
});

app.get('/personen', (req, res) => {
  const query = 'SELECT * FROM personen';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});
app.get('/berufsfachschule', (req, res) => {
  const query = 'SELECT * FROM berufsfachschule';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});
app.get('/beruf', (req, res) => {
  const query = 'SELECT * FROM beruf';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});
app.get('/fachrichtung', (req, res) => {
  const query = 'SELECT * FROM fachrichtung';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});
app.get('/gruppe', (req, res) => {
  const query = 'SELECT * FROM gruppe';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

app.put('/personen/:id', (req, res) => {
  const { id } = req.params;
  const { Vorname, Nachname, Adresse, PLZ, Ort, Geburtsdatum, Berufsfachschule, Beruf, Fachrichtung, Gruppe } = req.body;

  console.log(req.body);

  const updateData = {
    Vorname,
    Nachname,
    Adresse,
    PLZ,
    Ort,
    Geburtsdatum,
    Berufsfachschule,
    Beruf,
    Fachrichtung,
    Gruppe
  };

  console.log(updateData);
  connection.query('UPDATE personen SET ? WHERE id = ?', [updateData, id], (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json({ message: 'Record updated successfully' });
    }
  });
});
app.listen(port, () => {
  console.log(`Backend server is running on ${port}`);
});
