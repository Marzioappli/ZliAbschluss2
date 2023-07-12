//Datenbank ist eine organisierte Sammlung von strukturierten Daten

const express = require('express'); //import von Node.js Modul
const cors = require("cors");
const mysql = require('mysql');

const port = 5000; //Läuft auf Port 5000
const app = express();
let config = require('./config.js');
let connection = mysql.createConnection(config); //connection zur DB + Konfigurationsdatei config
app.use(cors()) //für cors fehler
app.use(express.json())


connection.connect((err) => {
  if (err) throw err;
  console.log("Connected successfully to database!"); // Verbindung DB, bei Fehler = error
});

app.get('/personen', (req, res) => { //Endpunkt
  const query = 'SELECT * FROM personen';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' }); // Holt Datensätze aus Tabelle
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
  connection.query('UPDATE personen SET ? WHERE id = ?', [updateData, id], (error, results) => {  //Aktualisierung
    if (error) {
      console.error('Error executing:', error);
      res.status(500).json({ error: 'Database error' }); //error
    } else {
      res.json({ message: 'Record updated successfully' });//erfolgreich
    }
  });
});
app.listen(port, () => {
  console.log(`Backend server is running on ${port}`);//Projekt läuft auf port 5000
});
