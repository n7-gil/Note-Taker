const express = require("express");
const path = require("path");
const fs = require("fs");
const uniqid = require("uniqid");

const data = require("./db/db.json");

const app = express();

const PORT = process.env.PORT || 3001;

// middleware converting request to JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// starting path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// path to notes.html
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// path to the data from the server
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.err(err);
    } else {
      const noteData = JSON.parse(data);
      res.json(noteData);
    }
  });
});

// method posting new note. creates a variable containing an object "title, text"
// calls id using uniqid npm
app.post("/api/notes", (req, res) => {
  const { text, title } = req.body;

  if (text && title) {
    const newNote = {
      title,
      text,
      id: uniqid(),
    };

    // reads the data previously posted. checks for error first, if no error,
    // then new variable is created, grabbed the object, converts it to string because fs only passes strings

    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const noteData = JSON.parse(data);
        noteData.push(newNote);
        fs.writeFile("./db/db.json", JSON.stringify(noteData), (err) => {
          err ? console.error(err) : console.log("Note accepted");
        });
        res.json(`${newNote.title} has been added.`);
      }
    });
  } else {
    res.error("Error could not post!");
  }
});

// redirects user to main page if route is typed incorrectly or nonexistent
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// calls for server
app.listen(PORT, () => {
  console.log(`App listening to http://localhost:${PORT}`);
});
