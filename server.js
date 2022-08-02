const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/index.html'));
  });

app.listen(PORT, () => {
console.log(`App listening to ${PORT}`)
})

// app.get('/api/index/*', (req, res)) ; res.json();
