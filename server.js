const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(express.static('public'));

app.get('/api/notes', (req, res) => res.json(noteData));

app.get('/api/index/*', (req, res)) ; res.json();
