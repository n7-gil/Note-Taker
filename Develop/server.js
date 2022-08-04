const express = require('express');
const path = require('path');
const fs = require('fs');

const data = require('./db/db.json');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes' , (req, res) => res.json(data));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});


app.listen(PORT, () => {
console.log(`App listening to http://localhost:${PORT}`)
});


